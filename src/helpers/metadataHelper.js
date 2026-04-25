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

export {sanitizeRomName}