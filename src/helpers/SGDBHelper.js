import SGDB from "steamgriddb";
import dotenv from 'dotenv';

dotenv.config({quiet: true})
const SGBDClient = new SGDB(process.env.STEAMGRIDDB_API_KEY)

/* use steamgriddb to search for the title, then get the cover art for it */
const getCoverArtFromName = async (title) => {
    const games = await SGBDClient.searchGame(title);

    // pick first result-- most accurate
    const game = games[0];
    const grids = await SGBDClient.getGridsById(game.id, undefined, undefined, undefined, undefined, 'false', 'false')
    return grids[0].url;
}

export default getCoverArtFromName