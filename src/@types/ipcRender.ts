import { IpcRenderer } from 'electron'

// 名前定義
declare global {
  interface Window {
    require: (module: 'electron') => {
      ipcRenderer: IpcRenderer
    }
  }
}
export const { ipcRenderer } = window.require('electron')
