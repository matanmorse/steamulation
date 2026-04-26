import {spawn} from 'node:child_process'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import getGameLists from './RAAPIHelper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RA_HASHER_EXE_PATH = path.join(__dirname, '../resources/RAHasher.exe')

const searchForHashes = async (systemIds, romPath) => {
    // get list of hashes for the system and hashes for the rom
    const [gameLists, hashes] = await Promise.all([
        getGameLists(systemIds),
        hashRom(romPath, systemIds),
    ]);

    console.log('[searchForHashes] systemIds:', systemIds);
    console.log('[searchForHashes] gameLists length:', gameLists.length);
    console.log('[searchForHashes] gameLists keys defined:', gameLists.map((g, i) => `${systemIds[i]}: ${g !== undefined}`));

    // search for matches
    for (const id of systemIds) {
        const hash = hashes[id];
        if (!hash) continue;

        const gameList = gameLists[systemIds.indexOf(id)];
        const game = gameList?.find(x => x.hashes.includes(hash));
        if (!game) continue;
        console.log(`[Hashing Helper] Found hash match for game ${romPath}: ${game.title}`);
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
    console.log(`[Hashing Helper] No hash match found for ${romPath}`);
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
                //console.log(`hashing ${romPath} on system ${id} got ${output}`);
                rahasher.stdout.on('data', (data) => {output += data;
                    });
                rahasher.on('close', () => resolve({ id, hash: output.trim() || null }));
                rahasher.on('error', () => resolve({ id, hash: null }));
            });
        })
    );
    return Object.fromEntries(results.map(({ id, hash }) => [id, hash]));
}

export {searchForHashes, hashRom}