import { buildAuthorization, getGameList as getGameListRAAPI } from "@retroachievements/api";
import ElectronStore from "electron-store";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from 'dotenv'
import { spawn } from "node:child_process";
import { getRomPathFromFilename } from "./fileService.js";
import SGDB from "steamgriddb";
import igdb from 'igdb-api-node';
import apicalypse from 'apicalypse'
import { clearCache } from "../caching.js";
import { clear } from "node:console";
import { title } from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RA_HASHER_EXE_PATH = path.join(__dirname, '../resources/RAHasher.exe')

const systemNames2SystemID = {
    "Nintendo 64": 2,
    "SNES/Super Famicom": 3,
    "Game Boy": 4,
    "Game Boy Advance": 5,
    "Game Boy Color": 6,
    "NES/Famicom": 7,
    "Playstation": 12,
    "GameCube": 16,
    "Nintendo DS": 18,
    "Wii": 19,
    "Wii U": 20,
    "Playstation 2":21,
    "Xbox": 22,
    "Playstation Portable": 41,
    "Nintendo 3DS": 62,
}

const fileEndingsToSystemID = {
    "3ds": [62],
    "cci": [62],
    "cia": [62],
    "3dsx": [62],
    "nds": [18],
    "srl": [18],
    "iso": [16, 19, 41, 21, 12],
    "rvz": [16, 19],
    "gcz": [16, 19],
    "gcm": [16, 19],
    "wia": [16, 19],
    "ciso": [16, 19],
    "dol": [16, 19],
    "elf": [16, 19, 41],
    "wbfs": [19],
    "wad": [19],
    "cso": [41, 21],
    "chd": [41, 21, 12],
    "pbp": [41, 12],
    "prx": [41],
    "wua": [20],
    "wux": [20],
    "wud": [20],
    "rpx": [20],
    "n64": [2],
    "v64": [2],
    "z64": [2],
    "sfc": [3],
    "smc": [3],
    "fig": [3],
    "swc": [3],
    "gd3": [3],
    "nes": [7],
    "fds": [7],
    "gb": [4],
    "nbc": [4],
    "gba": [5],
    "zso": [21],
    "m3u": [12],
    "ecm": [12],
    "mds": [12],
    "mdf": [12],
}

const IGDB_PLATFORM_IDS = {
    2: 4,    // N64
    3: 58,   // SNES
    4: 33,   // Game Boy
    5: 24,   // GBA
    6: 22,   // GBC
    7: 18,   // NES
    12: 57,  // PS1
    16: 21,  // GameCube
    18: 20,  // NDS
    19: 5,   // Wii
    20: 41,  // Wii U
    21: 8,   // PS2
    41: 38,  // PSP
    62: 37,  // 3DS
}
dotenv.config({quiet: true})

const metadataCache = new ElectronStore();
const SGBDClient = new SGDB(process.env.STEAMGRIDDB_API_KEY)

// First, get an access token
const tokenRes = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`, { method: 'POST' });
const { access_token } = await tokenRes.json();
// configure IGDB data with token and client id
const IGDBQueryData = {
    method: 'post',
    baseURL: 'https://api.igdb.com/v4',
    headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID,
        'Authorization': `Bearer ${access_token}`,
    }
}

// auth for RA_API
const authorization = buildAuthorization({
    username: process.env.RA_API_USER,
    webApiKey: process.env.RA_API_KEY,
});

const getMetadata = async (filename) => {
    if (!filename) return undefined;

    console.log('Metadata cache miss for ' + filename);
    const romPath = await getRomPathFromFilename(filename);
    const systemIds = fileEndingsToSystemID[romPath.split('.').at(-1)];
    const [gameLists, hashes] = await Promise.all([
        getGameLists(systemIds),
        hashRom(romPath, systemIds),
    ]);

    var game = searchForHashes(systemIds, gameLists, hashes)
    if (game === null) console.log(`No game found for ${filename}`);

    // if we couldn't identify the game by its rom, just get cover art from filename as fallback
    if (game === null) {
        const titleFromFilename = filename.split('.')[0];
        game = {title: titleFromFilename, coverArt: await getCoverArtFromName(titleFromFilename)}
    }

    // TODO: LOOP THROUGH SYSTEM IDS
    const igdb_metadata = await getIGBBMetadata(game.title, systemIds[0])
    if (igdb_metadata === undefined) console.log('[IGDB Metadata] IGDB data for ' + title + ' was undefined.')
    
    // if we found a title, get cover art from SteamGridDB
    const coverArt = await getCoverArtFromName(game.title);
    game['coverArt'] = coverArt;
    game = {...game, ...igdb_metadata}
    return game;
}

// Find first systemId where the hash matches an entry in its gamelist
const searchForHashes = (systemIds, gameLists, hashes) => {
    for (const id of systemIds) {
        const hash = hashes[id];
        if (!hash) continue;

        const gameList = gameLists[systemIds.indexOf(id)];
        const game = gameList?.find(x => x.hashes.includes(hash));
        if (!game) continue;

        console.log(`Found - ${game.title}`);
        return {
            title: game.title,
            hash,
            icon: game.imageIcon,
            RAAPI_id: game.id,
            console_id: game.consoleId,
            console_name: game.consoleName,
            coverArt: undefined,
            description: undefined,
        };
    }
    return null;
}

/* Get hash for each systemId, returning object of { systemId: hash } */
const hashRom = async (romPath, systemIds) => {
    const results = await Promise.all(
        systemIds.map(async (id) => {
            return new Promise((resolve) => {
                const rahasher = spawn(RA_HASHER_EXE_PATH, [id, romPath]);
                let output = '';
                // to view hashes, put this after the output+=data; 
                // 
                rahasher.stdout.on('data', (data) => {output += data;console.log(`hashing ${romPath} on system ${id} got ${output}`);});
                rahasher.on('close', () => resolve({ id, hash: output.trim() || null }));
                rahasher.on('error', () => resolve({ id, hash: null }));
            });
        })
    );
    return Object.fromEntries(results.map(({ id, hash }) => [id, hash]));
}

/* Get game lists for multiple systemIds, using caching */
const getGameLists = async (systemIds) => {
    let gameLists = metadataCache.get(`gameLists`) ?? {};

    const missing = systemIds.filter(id => gameLists[id] === undefined);

    await Promise.all(missing.map(async (id) => {
        gameLists[id] = await getGameListRAAPI(authorization, {
            consoleId: id,
            shouldRetrieveGameHashes: true
        });
    }));

    if (missing.length > 0) metadataCache.set(`gameLists`, gameLists);

    return systemIds.map(id => gameLists[id]);
}

/* use steamgriddb to search for the title, then get the cover art for it */
const getCoverArtFromName = async (title) => {
    const games = await SGBDClient.searchGame(title);

    // pick first result-- most accurate
    const game = games[0];
    const grids = await SGBDClient.getGridsById(game.id, undefined, undefined, undefined, undefined, 'false', 'false')
    return grids[0].url;
}

const getIGBBMetadata = async (title, systemId) => {
    const IGDBSystemId = IGDB_PLATFORM_IDS[systemId];
    console.log(`[IGDB Metadata] Getting IGDB entry for system ${systemId} with IGDB system ${IGDBSystemId} and name ${title}`);
    const response = await apicalypse(IGDBQueryData)
        .fields('name, cover, summary, artworks, first_release_date, game_type, total_rating_count, platforms')
        .search(title)
        .limit(10)
        .where('game_type = 0')
        .request('/games')
    const resData = response.data;
    // return response with highest rating count, biasing to more popular titles
    const sortedData = resData.sort((a, b) => (b.total_rating_count ?? 0) - (a.total_rating_count ?? 0));
    console.log(sortedData)
    return sortedData[0];
}

clearCache(metadataCache, 'metadata');
export {getMetadata, metadataCache}