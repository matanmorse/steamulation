import { buildAuthorization, getGameList } from "@retroachievements/api";
import { metadataCache } from "../services/metadataService.js";
import pLimit from 'p-limit'

const limit = pLimit(2);
// auth for RA_API
const authorization = buildAuthorization({
    username: process.env.RA_API_USER,
    webApiKey: process.env.RA_API_KEY,
});

const inFlight = new Map();

/* Get game lists for multiple systemIds, using caching */
const getGameLists = async (systemIds) => {
    if (!systemIds) return {}
    let gameLists = metadataCache.get(`gameLists`) ?? {};
    
    const missing = systemIds.filter(id => gameLists[id] === undefined);
    console.log(`[RAAPI Helper] Getting missing game lists for `, missing)
    await Promise.all(missing.map(async (id) => {
        if (!inFlight.has(id)) {
            const promise = limit(() => getGameList(authorization, {
                consoleId: id,
                shouldRetrieveGameHashes: true
            })).then(result => {
                gameLists[id] = result;
                inFlight.delete(id);
                return result;
            })
            inFlight.set(id, promise);
        }
        gameLists[id] = await inFlight.get(id);
    }));

    if (missing.length > 0) metadataCache.set(`gameLists`, gameLists);

    return systemIds.map(id => gameLists[id]);
}

export default getGameLists;