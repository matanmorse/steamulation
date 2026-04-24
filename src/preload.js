const {contextBridge, ipcRenderer} = require('electron') 

const invoke = async (channel, ...args) => {
    const result = await ipcRenderer.invoke(channel, ...args);
    if (result?.error) {
        throw { message: result.error, stack: result.stack };
    }
    return result?.data;
};

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => invoke('ping'),
})

contextBridge.exposeInMainWorld('fileService', {
  readFiles: () => invoke('readFiles'),
  selectExe: async (emulatorName) => await invoke('select-exe', emulatorName),
  selectRomFolder: async () => invoke('select-rom-folder'),
  getRomsFromFolder: async () => invoke('get-roms-from-folder')
})

contextBridge.exposeInMainWorld('configService', {
  hasSettings: () => invoke('has-settings'),
  resetSettings: (emulatorName) => invoke('reset-settings', emulatorName),
  resetRomFolder: () => invoke('reset-romfolder'),
  getEmulatorsConfig: () => invoke('get-emulators-config'),
  getSupportedEmulators: (fileFormat) => invoke('get-supported-emulators', fileFormat)
})

contextBridge.exposeInMainWorld('windowService', {
  close: () => invoke('window-close'),
  maximize: () => invoke('window-maximize'),
  minimize: () => invoke('window-minimize'),
})

contextBridge.exposeInMainWorld('launchGameService', {
  launchGame: async (romPath) => invoke('launchGame', romPath)
})

contextBridge.exposeInMainWorld('autoInstallService', {
  autoInstallAndConfigure: (emulatorName) => invoke('autoInstallAndConfigure', emulatorName)
})