import fs from 'fs/promises'
import {dialog} from 'electron'
import config, { getRomFolderPath, setEmulatorPath, setRomFolderPath } from './configService.js';

const readFiles = async () => {
    const files = await fs.readdir(directory);
    return files.reduce((x, y) => x + " " + y );
}

const getRomsFromFolder = async () => {
    if (getRomFolderPath() === '') return []
    return (await fs.readdir(getRomFolderPath())).filter(file => isSupportedFileType(file));
}

const selectRomFolder = async () => {
    const result = await dialog.showOpenDialog({
        title: 'Select ROM Folder',
        properties: ['openDirectory']
    })    
    setRomFolderPath(result.filePaths[0])
}

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
    console.log(filePath, 'is not supported')
    return false

}
export {
    readFiles,
    selectExe,
    selectRomFolder,
    getRomsFromFolder,
}