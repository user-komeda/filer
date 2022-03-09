import path from 'path'
import { BrowserWindow, app, session, Menu, ipcMain } from 'electron'
import { searchDevtools } from 'electron-search-devtools'
import { menu } from './menu'
import { execSync } from 'child_process'
import jschardet from 'jschardet'
import iconv from 'iconv-lite'
import fs from 'fs'

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
      preload: path.resolve(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (isDev) {
    // 開発モードの場合はデベロッパーツールを開く
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }
  Menu.setApplicationMenu(menu)
  // レンダラープロセスをロード
  mainWindow.loadFile('dist/index.html')

  const folderList = [
    '3D Objects',
    'Downloads',
    'Desktop',
    'Documents',
    'Videos',
    'Pictures',
    'Music'
  ]

  const stdout = execSync('wmic logicaldisk get caption').toString()
  const volumeName = execSync('wmic logicaldisk get VolumeName')
  const test = iconv.decode(volumeName, jschardet.detect(volumeName).encoding)
  const volumeLabelList: Array<string> = []
  test.split(/\n/).forEach((d, i) => {
    if (i !== 0) {
      volumeLabelList.push(d.trim())
    }
  })

  stdout.split(/\r\r\n/).forEach((d, i) => {
    if (d.match(/\:/)) {
      folderList.push(`${d.trim()}${volumeLabelList[i - 1]}`)
    }
  })
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('getFolder', folderList)
    ipcMain.on('onClick', (event, args) => {
      console.log(args.path)
      const files = fs.readdirSync(args.path)
      folderList.length = 0

      // ②：filesの内容をターミナルに表示
      files.forEach(function (file) {
        folderList.push(file)
      })
      event.returnValue = folderList
    })
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
