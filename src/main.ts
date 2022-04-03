import path from 'path'
import { BrowserWindow, app, session, Menu, ipcMain } from 'electron'
import { searchDevtools } from 'electron-search-devtools'
import { menu } from './menu'
import { exec, execSync, spawn } from 'child_process'
import { detect } from 'jschardet'
import iconv from 'iconv-lite'
import fs from 'fs'

const isDev = process.env.NODE_ENV === 'development'

// 開発モードの場合はホットリロードする
// if (isDev) {
//   const execPath =
//     process.platform === 'win32'
//       ? '../node_modules/electron/dist/electron.exe'
//       : '../node_modules/.bin/electron'

//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   require('electron-reload')(__dirname, {
//     electron: path.resolve(__dirname, execPath),
//     forceHardReset: true,
//     hardResetMethod: 'exit',
//   })
// }

// BrowserWindow インスタンスを作成する関数
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
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
    'Music',
  ]

  // diskのキャプションを取得
  const stdout = execSync('wmic logicaldisk get caption').toString()

  // VolumeName取得
  const volumeName = execSync('wmic logicaldisk get VolumeName')
  const decodeVolumeName = iconv.decode(volumeName, detect(volumeName).encoding)
  const volumeLabelList: Array<string> = []
  decodeVolumeName.split(/\n/).forEach((d, i) => {
    if (i !== 0) {
      volumeLabelList.push(d.trim())
    }
  })

  // キャプションとvolumeName結合
  stdout.split(/\r\r\n/).forEach((d, i) => {
    if (d.match(/:/)) {
      folderList.push(`${d.trim()}${volumeLabelList[i - 1]}`)
    }
  })

  // レンダラープロセスのイベント受信
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('getInitFolder', folderList)
    ipcMain.on('onClick', (event, args) => {
      const path = args.path
      const isDirectory = fs.statSync(path).isDirectory()

      console.log(path)
      if (!isDirectory) {
        const splitPath = path.split('/')
        const name = splitPath[splitPath.length - 2]
        const index = name.lastIndexOf('.')
        const extensionName = name.substring(index)
        const fileName = execSync(`assoc ${extensionName}`).toString()
        const fileIndex = fileName.lastIndexOf('=')
        const test = fileName.substring(fileIndex + 1)
        const programName = execSync(`ftype ${test}`).toString()
        const programIndex = programName.lastIndexOf('=')
        const p = programName.substring(programIndex + 1)
        const oIndex = p.lastIndexOf('%')
        const z = p.substring(0, oIndex)
        exec(z + path.substring(0, path.length - 1))

        event.returnValue = { folderList: folderList, flag: true }
      } else {
        const files = fs.readdirSync(path)

        folderList.length = 0

        // ②：filesの内容をターミナルに表示
        files.forEach(function (file) {
          folderList.push(file)
        })
        event.returnValue = { folderList: folderList, flag: false }
      }
    })
  })
}
app.whenReady().then(async () => {
  if (isDev) {
    // 開発モードの場合は React Devtools をロード
    const devtools = await searchDevtools('REACT')
    if (devtools) {
      await session.defaultSession.loadExtension(devtools, {
        allowFileAccess: true,
      })
    }
  }

  // BrowserWindow インスタンスを作成
  createWindow()
})

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit())
