import { buildAuthorization, getGameList as getGameListRAAPI } from "@retroachievements/api";
import ElectronStore from "electron-store";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from 'dotenv'
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RA_HASHER_EXE_PATH = path.join(__dirname, '../resources/RAHasher.exe')

dotenv.config()

const metadataCache = new ElectronStore();
// auth for RA_API
const authorization = buildAuthorization({
    username: process.env.RA_API_USER,
    webApiKey: process.env.RA_API_KEY,
});

const getMetadata = async (romPath) => {
    // TODO: Automatically get consoleID from file ending
    // TODO: Map names to ids
    const systemId = 18;
    
    // Get hash and gamelist
    const gameList = await getGameList(systemId);
    const hash = await hashRom(romPath, systemId);

    console.log(`finding hash ${hash} using systemId ${systemId} in list`)
    const game = gameList.find(x => x.hashes.includes(hash)); // game from hash

    game ? console.log(`Found- ${game.title}`) : console.log('No game found')
}

/* Call RAHasher.exe to get ROM hash */
const hashRom = (romPath, systemId) => {
    return new Promise((resolve, reject) => {
        const rahasher = spawn(RA_HASHER_EXE_PATH, [systemId, romPath]);
        let output = '';
        
        rahasher.stdout.on('data', (data) => output += data);
        rahasher.on('close', () => resolve(output.trim()));
        rahasher.on('error', reject);
    });
}

/* Get Gamelist with hashes & info from retro achievments, using caching */
const getGameList = async (consoleId) => {
    consoleId = 18;
    let gameLists = metadataCache.get(`gameLists`, undefined);
    if (gameLists === undefined) gameLists = {};

    var listForThisSystem = gameLists[consoleId]
    if (listForThisSystem === undefined) {
        console.log('Getting game list from API')
        listForThisSystem = await getGameListRAAPI(authorization, {
            consoleId: consoleId, 
            shouldRetrieveGameHashes: true
        });
        gameLists[consoleId] = listForThisSystem;
        metadataCache.set(`gameLists`, gameLists);
    } 
    return listForThisSystem;
}

export {getMetadata}