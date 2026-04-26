import dotenv from 'dotenv'
import apicalypse from 'apicalypse';

dotenv.config({quiet: true})

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

/* Get the lexical similarity of two strings based on bigram similarity using Dice's coefficient */
const getLexicalSimilarity = (a, b) => {
    a = a.toLowerCase().trim();
    b = b.toLowerCase().trim();
    
    if (a === b) return 1;
    if (!a.length || !b.length) return 0;

    // bigram similarity (Dice's coefficient)
    const bigrams = (str) => new Set(
        Array.from({ length: str.length - 1 }, (_, i) => str.slice(i, i + 2))
    );

    const aBigrams = bigrams(a);
    const bBigrams = bigrams(b);
    const intersection = [...aBigrams].filter(bg => bBigrams.has(bg)).length;

    return (2 * intersection) / (aBigrams.size + bBigrams.size);
}

/* Sorts a list of IGDB api responses by lexical similarity (see getIGDBMetadata in metadataService.js) 
    If two entries have the same lexical similarity, sort by total rating count (bias to more popular titles)
*/
const sortByLexicalSimilarity = (title, results) => {
    return results
        .map(r => ({ ...r, _score: getLexicalSimilarity(title, r.name) }))
        .sort((a, b) => b._score - a._score || (b.total_rating_count ?? 0) - (a.total_rating_count ?? 0));
}

const getIGBBMetadata = async (title) => {
    console.log(`[IGDB Metadata] Getting IGDB entry for name ${title}`);
    const response = await apicalypse(IGDBQueryData)
        .fields('name, summary, first_release_date, total_rating_count')
        .search(title)
        .limit(10)
        .request('/games')
    var resData = response.data;
    // return entry with the greatest lexical similarity to the title
    const sortedData = sortByLexicalSimilarity(title, resData)
    return sortedData[0];
}

export default getIGBBMetadata;