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

/* Sorts a list of IGDB api responses by lexical similarity (see getIGDBMetadata in metadataService.js) */
const sortByLexicalSimilarity = (title, results) => {
    return results
        .map(r => ({ ...r, _score: getLexicalSimilarity(title, r.name) }))
        .sort((a, b) => b._score - a._score);
}

export default sortByLexicalSimilarity;