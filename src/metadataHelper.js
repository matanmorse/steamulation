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

const sanitizeRomName = (filename) => {
    return filename
        .replace(/\.[^.]+$/, '')           // remove extension
        .replace(/\(.*?\)/g, '')           // remove (USA), (Europe), (Rev 1), etc.
        .replace(/\[.*?\]/g, '')           // remove [!], [b], [h], etc.
        .replace(/\s*-\s*(?:Disc|Disk|CD|Side)\s*\w+/gi, '') // remove - Disc 1, etc.
        .replace(/\s*:\s*/, ' ')           // normalize colons
        .replace(/[_]/g, ' ')              // underscores to spaces
        .replace(/\s+/g, ' ')             // collapse whitespace
        .trim();
}

export {sortByLexicalSimilarity, sanitizeRomName}