import {contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
})

contextBridge.exposeInMainWorld('fileService', {
  readFiles: () => ipcRenderer.invoke('readFiles'),
  selectExe: async (emulatorName) => await ipcRenderer.invoke('select-exe', emulatorName),
  selectRomFolder: async () => ipcRenderer.invoke('select-rom-folder'),
  getRomsFromFolder: async () => ipcRenderer.invoke('get-roms-from-folder')
})

contextBridge.exposeInMainWorld('configService', {
  hasSettings: () => ipcRenderer.invoke('has-settings'),
  resetSettings: (emulatorName) => ipcRenderer.invoke('reset-settings', emulatorName),
  resetRomFolder: () => ipcRenderer.invoke('reset-romfolder'),
  getEmulatorsConfig: () => ipcRenderer.invoke('get-emulators-config')
})

contextBridge.exposeInMainWorld('launchGameService', {
  launchGame: async (emulator, romPath) => ipcRenderer.invoke('launchGame', emulator, romPath)
})
