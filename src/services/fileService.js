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

export {
    selectExe,
    selectRomFolder,
    getGames,
    romStore
}