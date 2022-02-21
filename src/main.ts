import path from 'path'
import { BrowserWindow, app, session, Menu } from 'electron'
import { searchDevtools } from 'electron-search-devtools'
import { menu } from './menu'
import * as child_process from 'child_process'
import iconv from 'iconv-lite'
import encoding from 'encoding-japanese'

const isDev = process.env.NODE_ENV === 'development'

// 開発モードの場合はホットリロードする
if (isDev) {
  const execPath =
    process.platform === 'win32'
      ? '../node_modules/electron/dist/electron.exe'
      : '../node_modules/.bin/electron'

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('electron-reload')(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: 'exit'
  })
}

// BrowserWindow インスタンスを作成する関数
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js')
    }
  })

  if (isDev) {
    // 開発モードの場合はデベロッパーツールを開く
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }
  Menu.setApplicationMenu(menu)
  // レンダラープロセスをロード
  mainWindow.loadFile('dist/index.html')

  child_process.exec('dir', (error, stdout, stderr) => {
    if (error instanceof Error) {
      console.error(error)
      console.log('exec Error *******')
    } else {
      for (const output of stdout) {
        console.log(output)
        console.log('---------------')
      }
      console.log(stdout)
    }
  })
}

app.whenReady().then(async () => {
  if (isDev) {
    // 開発モードの場合は React Devtools をロード
    const devtools = await searchDevtools('REACT')
    if (devtools) {
      await session.defaultSession.loadExtension(devtools, {
        allowFileAccess: true
      })
    }
  }

  // BrowserWindow インスタンスを作成
  createWindow()
})

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit())
