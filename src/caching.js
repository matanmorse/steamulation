const inFlight = {};

const withCache = async (cache, namespace, key, fetchFn) => {
    const store = cache.get(namespace) ?? {};
    if (key in store) return store[key];

    const inFlightKey = `${namespace}:${key}`;
    if (inFlightKey in inFlight) return inFlight[inFlightKey];

    inFlight[inFlightKey] = fetchFn().then(value => {
        console.log('[Cache] Setting Cache Entry for ' + key + ' in ' + namespace)
        cache.set(namespace, { ...cache.get(namespace) ?? {}, [key]: value });
        delete inFlight[inFlightKey];
        return value;
    });

    return inFlight[inFlightKey];
}

/* Clear any entry from the cache
Usage: 
clearCache(metadataCache);                          // clear everything
clearCache(metadataCache, 'metadata');              // clear entire metadata namespace
clearCache(metadataCache, 'metadata', 'game.rom'); // clear single entry
clearCache(metadataCache, 'gameLists', '18');       // clear single system gamelist */
const clearCache = (cache, ...keys) => {
    console.log(`[Cache] Clearing`, keys)
    
    if (keys.length === 0) {
        cache.clear();
        return;
    }

    if (keys.length === 1) {
        cache.delete(keys[0]);
        return;
    }

    // drill into nested keys
    const [rootKey, ...nestedKeys] = keys;
    let store = cache.get(rootKey);
    if (!store) return;

    // navigate to the parent of the target key
    const target = nestedKeys.slice(0, -1).reduce((obj, key) => obj?.[key], store);
    if (!target) return;

    delete target[nestedKeys.at(-1)];
    cache.set(rootKey, store);
}

export default withCache;
export {clearCache}