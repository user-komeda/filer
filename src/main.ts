import { dialog, BrowserWindow, app, Menu, ipcMain } from 'electron'
import path from 'path'
import { menu } from './menu'
import { exec, execSync } from 'child_process'
import { detect } from 'jschardet'
import iconv from 'iconv-lite'
import fs from 'fs'
import FileInfo from './@types/fileInfo'

const isDev = process.env.NODE_ENV === 'development'
const iconFolderPath = 'c://Users/user/Desktop/learning/electron/filer/icon/'

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

  const folderList: Array<FileInfo> = [
    { fileName: '3D Objects' },
    { fileName: 'Downloads' },
    { fileName: 'Desktop' },
    { fileName: 'Documents' },
    { fileName: 'Videos' },
    { fileName: 'Pictures' },
    { fileName: 'Music' },
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
      folderList.push({ fileName: `${d.trim()}${volumeLabelList[i - 1]}` })
    }
  })

  // レンダラープロセスのイベント受信
  mainWindow.webContents.on('did-finish-load', () => {
    const sendData = {
      folderList: folderList,
      flags: true,
      volumeLabelList: volumeLabelList,
    }
    mainWindow.webContents.send('sendDataMain', sendData)
    ipcMain.on('onClick', (event, args) => {
      const path = args.path
      const result = fs.existsSync(path)
      if (!result) {
        dialog.showErrorBox(
          'エクスプローラ',
          `${args.path}は見つかりません。綴りを確認して再度実行してください。`
        )
        event.returnValue = { folderList: null, flag: false }
        return
      }
      const isDirectory = fs.statSync(path).isDirectory()
      if (!isDirectory) {
        const extensionName = getExtensionName(path)
        try {
          getExecProgramName(extensionName, path)
        } catch (error) {
          openDialog(path)
        }
        event.returnValue = {
          folderList: folderList,
          flag: true,
          isFile: true,
        }
      } else {
        const files = fs.readdirSync(path)
        folderList.length = 0
        // ②：filesの内容をターミナルに表示
        const fileType = execSync(
          `pwsh.exe -command c://Users/user/Desktop/learning/electron/filer/test.ps1 ${path} -NoNewWindow -Wait`
        )
        const fileTypeList = iconv.decode(fileType, 'Shift_JIS').split('\n')
        files.forEach(function (file) {
          const fileData = fs.statSync(`${path}/${file}`)
          const size = fileData.size
          const mtime = new Date(fileData.mtime).toLocaleDateString()

          const fileInfo: FileInfo = {
            fileSize: size,
            fileName: file,
            updateFileTime: mtime,
            fileType: '',
            filePath: path,
          }
          folderList.push(fileInfo)
        })

        folderList.forEach((folder, index) => {
          folder.fileType = fileTypeList[index]
        })
        event.returnValue = {
          folderList: folderList,
          flag: false,
          isFile: false,
        }
      }
    })
    ipcMain.on('onChange', (event, args) => {
      const path = args.path
      const result = fs.existsSync(path)
      if (!result) {
        dialog.showErrorBox(
          'エクスプローラ',
          `${args.path}は見つかりません。綴りを確認して再度実行してください。`
        )
        event.returnValue = { folderList: null, flag: false }
        return
      }

      const files = fs.readdirSync(path)

      folderList.length = 0
      const fileType = execSync(
        `pwsh.exe -command c://Users/user/Desktop/learning/electron/filer/test.ps1 ${path} -NoNewWindow -Wait`
      )
      const fileTypeList = iconv.decode(fileType, 'Shift_JIS').split('\n')
      // ②：filesの内容をターミナルに表示
      files.forEach(function (file) {
        const fileData = fs.statSync(`${path}/${file}`)
        const size = fileData.size
        const mtime = new Date(fileData.mtime).toLocaleDateString()

        const fileInfo: FileInfo = {
          fileSize: size,
          fileName: file,
          updateFileTime: mtime,
          fileType: '',
        }
        folderList.push(fileInfo)
      })
      folderList.forEach((folder, index) => {
        folder.fileType = fileTypeList[index]
      })

      event.returnValue = { folderList: folderList, flag: true }
    })
  })
}
app.whenReady().then(async () => {
  if (isDev) {
    // installExtension(REDUX_DEVTOOLS)
    // // 開発モードの場合は React Devtools をロード
    // const devtools = await searchDevtools('REACT')
    // if (devtools) {
    //   await session.defaultSession.loadExtension(devtools, {
    //     allowFileAccess: true,
    //   })
    // }
  }

  // BrowserWindow インスタンスを作成
  createWindow()
})

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit())

/**
 *
 * @param path - path
 *
 * @return extensionName
 */
const getExtensionName = (path: string): string => {
  const splitPath = path.split('/')
  const name = splitPath[splitPath.length - 1]
  const index = name.lastIndexOf('.')
  const extensionName = name.substring(index)

  return extensionName
}

/**
 *
 * @param extensionName - extensionName
 *
 * @param path - path
 */
const getExecProgramName = (extensionName: string, path: string) => {
  const fileName = execSync(`assoc ${extensionName}`).toString()
  const fileIndex = fileName.lastIndexOf('=')
  const programName = fileName.substring(fileIndex + 1)
  const openedProgramName = execSync(`ftype ${programName}`).toString()
  const openedProgramIndex = openedProgramName.lastIndexOf('=')
  const execProgramName = openedProgramName.substring(openedProgramIndex + 1)
  const execProgramIndex = execProgramName.lastIndexOf('%')
  const execProgram = execProgramName.substring(0, execProgramIndex)
  exec(execProgram + path)
}

/**
 * 関連付けられた拡張子以外のファイルをクリックした場合どのプログラムで開くかダイアログを表示
 *
 * @param path - path
 */
const openDialog = (path: string) => {
  const programName = execSync(
    'pwsh.exe -command c://Users/user/Desktop/learning/electron/filer/getProgramName.ps1'
  ).toString()

  const programNameList: Array<string> = programName.split('\n')
  cleatsChildWindow(programNameList, path)
}

const cleatsChildWindow = (
  programNameList: Array<string>,
  clickedPath: string
) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 450,
    height: 600,
  })
  childWindow.loadFile('dist/index.html')
  childWindow.webContents.openDevTools({ mode: 'detach' })

  childWindow.webContents.on('did-finish-load', () => {
    const iconList = fs.readdirSync(iconFolderPath)
    const sendData = {
      flags: false,
      programNameList: programNameList,
      path: clickedPath,
      iconList: iconList,
    }
    childWindow.webContents.send('sendDataNormal', sendData)
    ipcMain.on('clickedProgramList', (event, data) => {
      childWindow.close()
      const programPath = execSync(
        'pwsh.exe -command C:\\Users\\user\\Desktop\\learning\\electron\\filer\\getProgramPath.ps1'
      ).toString()
      const programPathList = programPath.split('\n')
      for (const programPath of programPathList) {
        if (programPath.includes(data.trim())) {
          exec(programPath + ' ' + clickedPath)
          break
        }
      }
    })
  })
}
