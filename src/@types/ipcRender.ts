import { IpcRenderer } from 'electron'

declare global {
  interface Window {
    require: (module: 'electron') => {
      ipcRenderer: IpcRenderer
    }
  }
}
export const { ipcRenderer } = window.require('electron')
