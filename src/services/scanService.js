import path from 'path'
import fs from 'fs/promises'
import os from 'os'
import config from './configService.js';
import { romStore } from './fileService.js';
import { getMetadata, metadataCache } from './metadataService.js';
import withCache from '../caching.js';

const DEFAULT_SCAN_FOLDERS = [
  path.join(os.homedir(), 'Desktop'),
  path.join(os.homedir(), 'Downloads'),
  path.join(os.homedir(), 'Documents'),
  process.env.APPDATA,
].filter(Boolean);

const doRomAutoScan = async() => {
    var scanResult = await Promise.all(DEFAULT_SCAN_FOLDERS.map(async (folder) => {
        return await scanForRoms(folder);
    }))
    scanResult = scanResult.flat(Infinity);
    // only set new/unique roms
    const existing = romStore.get('roms') ?? [];
    const merged = [...new Set([...existing, ...scanResult])];
    romStore.set('roms', merged);
    
    // fetch metadata for new roms so that cache is populated
    await Promise.all(merged.map(async (x) => {
        await withCache(metadataCache, 'metadata', x, () => getMetadata(x))
    }));
}

/* Returns all valid roms within the folder and its subfolders */
const scanForRoms = async (folderPath) => {
    const roms = [];    
  
    const scan = async (dir) => {
        // console.log(`[Scanner] Scanning ${dir}`)

        const entries = await fs.readdir(dir, { withFileTypes: true });
        await Promise.all(entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await scan(fullPath);
        } else if (entry.isFile() && isSupportedFileType(entry.name)) {
            console.log(`[Scanner] Found ${fullPath}`)
            roms.push(fullPath);
        }
        }));
  };

  await scan(folderPath);
  return roms;
}

/* Returns if the full file path is compatible with any supported emulators */
const isSupportedFileType = (filePath) => {
    if (!filePath.includes('.')) return false
    const fileExtension = filePath.split('.').at(-1);

    for (const element of config.emulators) {
        for (const format of element.fileFormats) {
            if (format === fileExtension) {
                return true;
            }
        }
    }
    return false
}

export {
    doRomAutoScan
}