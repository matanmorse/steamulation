import {app, BrowserWindow, ipcMain} from 'electron'
import { fileURLToPath } from 'url';
import path from 'node:path'
import { selectExe, selectRomFolder, getGames } from './services/fileService.js';
import { launchGame } from './services/launchGameService.js';
import { getEmulatorsConfig, getSupportedEmulators, hasSettings, isDev, resetRomFolderPath, resetSettings } from './services/configService.js'
import { AutoInstallAndConfigure } from './services/autoInstallService.js'
import dotenv from 'dotenv'
import startup from 'electron-squirrel-startup'; // Use import for ESM
import { getMetadata, metadataCache } from './services/metadataService.js';
import withCache, { clearCache } from './caching.js';

if (startup) {app.quit()}

dotenv.config({quiet: true})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;
const createWindow = () => {
    // TODO: Open to window size
    win = new BrowserWindow({
        width: 1440,
        height: 850,
        frame:false,
        icon: path.join(__dirname, 'resources', 'app-icon.ico'),
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (isDev()) win.loadURL('http://localhost:5173');
    else win.loadFile(path.join(__dirname, './renderer/dist/index.html'))
}


app.whenReady().then(() => {
    createWindow();
    const handleIpc = (channel, handler) => {
        ipcMain.handle(channel, async (event, ...args) => {
            try {
                return { data: await handler(event, ...args), error: null };
            } catch (error) {
                console.log(error)
                return { data: null, error: error.message || 'An error occurred', stack: error.stack};
            }
        });
    };
    
    handleIpc('ping', () => 'hello from main')
    handleIpc('readFiles', async () => readFiles())
    handleIpc('launchGame', async (event, romPath) => launchGame(romPath))
    handleIpc('select-exe', async (event, emulator) => selectExe(emulator))
    handleIpc('get-games', async () => getGames())
    handleIpc('select-rom-folder', async () => selectRomFolder())
    handleIpc('has-settings', () => hasSettings())
    handleIpc('reset-settings', (e, emulator) => resetSettings(emulator))
    handleIpc('get-emulators-config', () => getEmulatorsConfig())
    handleIpc('reset-romfolder', () => resetRomFolderPath())
    handleIpc('autoInstallAndConfigure', async (e, emulatorName) => AutoInstallAndConfigure(emulatorName))
    handleIpc('get-supported-emulators', (e, fileFormat) => getSupportedEmulators(fileFormat))
    handleIpc('window-minimize', () => win.minimize());
    handleIpc('window-maximize', () => {
    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
    });
    handleIpc('window-close', () => win.close());

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
