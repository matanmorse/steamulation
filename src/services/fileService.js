import fs from 'fs/promises'
import {dialog} from 'electron'
import config, { getRomFolderPath, setEmulatorPath, setRomFolderPath } from './configService.js';
import path from 'path';
import os from 'os'
import ElectronStore from 'electron-store';
import withCache from '../caching.js';
import { getMetadata, metadataCache } from './metadataService.js';

const romStore = new ElectronStore()

/* Get games and their associated metadata */
const getGames = async () => {
    // Get roms from store
    var roms = romStore.get('roms', []);    
    // add metadata
    roms = await Promise.all(roms.map(async (rom) => {
        const metadata = await withCache(metadataCache, 'metadata', rom, () => getMetadata(rom))
        return {
            path: rom,
            ...metadata,
        }
    }))
    return roms;
}

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

/* Opens dialog to select ROM folder */
const selectRomFolder = async () => {
    const result = await dialog.showOpenDialog({
        title: 'Select ROM Folder',
        properties: ['openDirectory']
    })    
    setRomFolderPath(result.filePaths[0])
}

/* Opens file dialog to select an exe for the given emulator key */
const selectExe = async (emulatorName) => {
    const result = await dialog.showOpenDialog({
        title: `Select Executable (${emulatorName})`,
        properties: ['openFile', 'showHiddenFiles'],
        filters: [
            {name: 'Executable', extensions: ['exe']}
        ]
    })
    
    setEmulatorPath(emulatorName, result.filePaths[0]);

    return result.filePaths[0]
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
    selectExe,
    selectRomFolder,
    getGames,
    doRomAutoScan,
    romStore
}