import {app, BrowserWindow, ipcMain} from 'electron'
import { fileURLToPath } from 'url';
import path from 'node:path'
import { getRomsFromFolder, readFiles, selectExe, selectRomFolder } from './services/fileService.js';
import { launchGame } from './services/launchGameService.js';
import config, { getEmulators, getEmulatorsConfig, getEmulatorsPrettyNames, hasSettings, isDev, resetRomFolderPath, resetSettings } from './services/configService.js'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;
const createWindow = () => {
    // TODO: Open to window size
    win = new BrowserWindow({
        width: 1440,
        height: 1080,
        frame:false,
        icon: path.join(__dirname, 'resources', 'app-icon.ico'),
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (isDev()) win.loadURL('http://localhost:5173');
    else win.loadFile(path.join(__dirname, './renderer/dist/index.html'))
}

console.log(isDev())

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('ping', () => 'hello from main')
    ipcMain.handle('readFiles', async () => readFiles())
    ipcMain.handle('launchGame', async (event, emulator, romPath) => launchGame(emulator, romPath))
    ipcMain.handle('select-exe', async (event, emulator) => selectExe(emulator))
    ipcMain.handle('get-roms-from-folder', async () => getRomsFromFolder())
    ipcMain.handle('select-rom-folder', async () => selectRomFolder())
    ipcMain.handle('has-settings', () => hasSettings())
    ipcMain.handle('reset-settings', (e, emulator) => resetSettings(emulator))
    ipcMain.handle('get-emulators-config', () => getEmulatorsConfig())
    ipcMain.handle('reset-romfolder', () => resetRomFolderPath())

    ipcMain.handle('window-minimize', () => win.minimize());
    ipcMain.handle('window-maximize', () => {
    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
    });
    ipcMain.handle('window-close', () => win.close());

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    console.log('config: ' + JSON.stringify(config))
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})