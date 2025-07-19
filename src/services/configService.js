import { app } from 'electron';
import path from 'path';
import Store from 'electron-store'
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configRootPath = path.resolve(__dirname,'../resources', 'config.json')

const config = JSON.parse(readFileSync(configRootPath, 'utf-8'));

const isDev = () => process.env.NODE_ENVIRONMENT === 'Development'

const getEmulatorPath = (name) => settingsStore.get(`${name}-exe-path`)
const getRomFolderPath = () => settingsStore.get('romfolder-path')

var settingsDir = ""

app.whenReady().then(() => {
    settingsDir = path.join(app.getPath('userData'), 'settings')
});

const resetSettings = (emulatorName) => {
    resetEmulatorPath(emulatorName)
    setRomFolderPath('')
}

const hasSettings = () => {
    return {
        citra: hasEmulator('Citra'),
        melonds: hasEmulator('MelonDS'),
        romFolder: !(getRomFolderPath() === '' || getRomFolderPath() == undefined),
    }
}

const hasEmulator = (name) => {
    const emulatorPath = settingsStore.get(`${name}-exe-path`)
    return !(emulatorPath == undefined )
    // return !(getEmulatorPath(`${name}-exe-path`) === '' || getEmulatorPath(`${name}-exe-path`) == undefined)
}

const settingsStore = new Store({
    name: 'settings',
    cwd: settingsDir,
})

const setEmulatorPath = (name, path) => {
    settingsStore.set(`${name}-exe-path`, path)
}

const resetEmulatorPath = (name) => {
    settingsStore.delete(`${name}-exe-path`)
}

const setRomFolderPath = (value) => {
    settingsStore.set('romfolder-path', value)
}

const resetRomFolderPath = () => {
    settingsStore.delete('romfolder-path')
}

const getEmulators = () => {
    const emulators = []
    config.emulators.forEach(element => {
          emulators.push(element.name)
    });
    return emulators;
}

const getEmulatorsPrettyNames = () => {
    const emulatorsPrettyNames = []
    config.emulators.forEach(element => {
        emulatorsPrettyNames.push(element.prettyName)
    });
    return emulatorsPrettyNames
}

const getEmulatorsConfig = () => {
    var fullConfig = config.emulators;

    for (const emulator of fullConfig) {
        console.log(emulator.prettyName, getEmulatorPath(emulator.name))
        emulator.exePath = getEmulatorPath(emulator.name)
    }
    fullConfig.find(x=>x.name==='Rom Folder').folderPath = getRomFolderPath();

    return fullConfig
}

export {getEmulatorPath, getRomFolderPath, setEmulatorPath, 
    setRomFolderPath, hasSettings, resetSettings, getEmulators, 
    getEmulatorsPrettyNames, isDev, getEmulatorsConfig, resetRomFolderPath}

export default config;