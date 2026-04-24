
/* get from a fetchfunction using caching with electron-store */
const withCache = async (cache, namespace, key, fetchFn) => {
    const store = cache.get(namespace) ?? {}
    if (key in store) return store[key]

    /* If not in store, get from fetch function
        these functions need to be declared anonymously 
        to use arguments in the fetch, like
        withCache(metadataCache, 'metadata', filename, () => getMetadata(filename))
    */
    const value = await fetchFn()
    console.log(`[Cache] Adding cache entry for key ${key} in ${namespace}`)
    cache.set(namespace, {...store, [key]:value })
    return value;
}

const clearCache = (cache, namespace) => {
    cache.delete(namespace)
}

export default withCache;
export {clearCache}