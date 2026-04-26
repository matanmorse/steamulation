import ElectronStore from "electron-store";
import { fileURLToPath } from "node:url";
import { clearCache } from "../caching.js";
import {sanitizeRomName} from "../helpers/metadataHelper.js";
import getIGBBMetadata from "../helpers/IGDBHelper.js";
import { hashRom, searchForHashes } from "../helpers/hashingHelper.js";
import getCoverArtFromName from "../helpers/SGDBHelper.js";

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

const metadataCache = new ElectronStore();
metadataCache.delete('metadata');

const getMetadata = async (path) => {
    const systemIds = fileEndingsToSystemID[path.split('.').at(-1)];
    const filename = path.split('\\').at(-1);

    // Try to find canonical game title by its ROM, if no match found, sanitize ROM filename and use that as the title
    var game = await searchForHashes(systemIds, path)
    if (game === null) {
        const titleFromFilename = sanitizeRomName(filename)
        game = {title: titleFromFilename, coverArt: await getCoverArtFromName(titleFromFilename)}
    }

    // Get the rest of the metadata from SteamGridDB and IGDB
    return {
        ...game,
        ...(await getIGBBMetadata(game.title)),
        coverArt: await getCoverArtFromName(game.title)
    }
}

export {getMetadata, metadataCache}