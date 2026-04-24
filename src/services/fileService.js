import fs from 'fs/promises'
import {dialog} from 'electron'
import config, { getRomFolderPath, setEmulatorPath, setRomFolderPath } from './configService.js';
import path from 'path';

/* Gets all files that can be run on a supported emulator in the ROM Folder (as configured in SetRomFolder)*/
const getRomsFromFolder = async () => {
    const romFolderPath = getRomFolderPath();
    if (romFolderPath === '' || !romFolderPath) return []
    return (await fs.readdir(romFolderPath)).filter(file => isSupportedFileType(file));
}

const getRomPathFromFilename = async (filename) => {
    const romFolder = getRomFolderPath();
    const files = await fs.readdir(romFolder);
    if (!files.includes(filename)) return null;
    return path.join(romFolder, filename);
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
    const fileExtension = filePath.split('.')[1]

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
    getRomsFromFolder,
    getRomPathFromFilename,
}