import { buildAuthorization } from "@retroachievements/api";
import { metadataCache } from "../services/metadataService.js";

// auth for RA_API
const authorization = buildAuthorization({
    username: process.env.RA_API_USER,
    webApiKey: process.env.RA_API_KEY,
});

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

export default getGameLists;