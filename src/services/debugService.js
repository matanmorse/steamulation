import { romStore } from "./fileService.js"
import { metadataCache } from "./metadataService.js"

const clearCache = (key) => {
    console.log('clearing ' + key)
    if (key === 'metadata') {
        metadataCache.delete('metadata')
    }
    else if (key === 'gameLists') {
        metadataCache.delete('gameLists')
    }
} 

const clearRoms = () => {
    console.log('clearing roms')
    romStore.delete('roms')
}

export {clearCache, clearRoms}