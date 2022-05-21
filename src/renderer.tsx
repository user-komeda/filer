import React, { useState } from 'react'
import { render } from 'react-dom'

import './styles.css'
import TabMenu from './component/tabMenu'
import PathTextMenu from './component/pathTextMenu'
import TextFilterMenu from './component/textFilterMenu'
import PanelMenu from './component/panelMenu'
import MainContent from './component/mainContent'
import Dialog from './component/dialog'
import { ipcRenderer } from './@types/ipcRender'
import FileInfo from './@types/fileInfo'

/**
 * レンダラープロセス
 */
const App = (): JSX.Element => {
  const [lastPath, setLastPath] = useState('c:/Users/user/')
  const [nowPath, setNowPath] = useState('')
  const [folderList, setFolderList] = useState<Array<FileInfo>>([])
  const [filteredFolderList, setFilteredFolderList] =
    useState<Array<FileInfo> | null>(null)
  const [flag, setFlag] = useState()
  const [programNameList, setProgramNameList] = useState([])

  ipcRenderer.once('sendDataMain', (err, data) => {
    setFlag(data.flags)
    setFolderList(data.folderList)
  })

  ipcRenderer.once('sendDataNormal', (err, data) => {
    setProgramNameList(data.programNameList)
    setLastPath(data.path)
    setFlag(data.flags)
  })
  return (
    <>
      {flag ? (
        <>
          <div style={{ backgroundColor: '#F0F0F0' }}>
            <div className="test">
              <PanelMenu
                undoFunction={() => {
                  undoFunction(nowPath, lastPath, setFolderList, setNowPath)
                }}
                redoFunction={() => {
                  redoFunction(nowPath, lastPath, setFolderList, setNowPath)
                }}
              ></PanelMenu>
              <PathTextMenu
                path={nowPath ? nowPath : lastPath}
                handleBlur={(event) => {
                  handleBlur(
                    event,
                    nowPath,
                    setLastPath,
                    setNowPath,
                    setFolderList
                  )
                }}
                handleChange={(event) => {
                  handleChange(event, setLastPath, setNowPath)
                }}
              ></PathTextMenu>
              <TextFilterMenu
                handleBlurFilter={(
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  handleBlurFilter(event, folderList, setFilteredFolderList)
                }}
              ></TextFilterMenu>
            </div>
            <div>
              <TabMenu></TabMenu>
            </div>
          </div>
          <div>
            <MainContent
              handleClick={(event) => {
                handleClick(
                  event,
                  nowPath,
                  lastPath,
                  setFolderList,
                  setLastPath,
                  setNowPath
                )
              }}
              folderList={
                filteredFolderList !== null ? filteredFolderList : folderList
              }
            ></MainContent>
          </div>
        </>
      ) : (
        <div>
          <Dialog programNameList={programNameList} path={nowPath}></Dialog>
        </div>
      )}
    </>
  )
}

const handleClick = (
  event: React.MouseEvent,
  nowPath: string,
  lastPath: string,
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>,
  setLastPath: React.Dispatch<React.SetStateAction<string>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>
): void => {
  const tmpPath = `${nowPath ? nowPath : lastPath}${
    event.currentTarget.textContent
  }`

  const result = ipcRenderer.sendSync('onClick', {
    path: tmpPath,
  })

  setLastPath(tmpPath + '/')
  setNowPath(tmpPath + '/')
  setFolderList(() => {
    return result.folderList
  })
}

const undoFunction = (
  nowPath: string,
  lastPath: string,
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>
) => {
  const tmpPath = nowPath ? nowPath.split('/') : lastPath.split('/')
  tmpPath.unshift()
  tmpPath.length = tmpPath.length - 2
  const path = tmpPath.join('/')
  const result = ipcRenderer.sendSync('onClick', {
    path: path,
  })
  setNowPath(path + '/')

  setFolderList(() => {
    return result.folderList
  })
}
const redoFunction = (
  nowPath: string,
  lastPath: string,
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>
) => {
  if (nowPath !== '' && nowPath !== lastPath) {
    const pathArray = nowPath.split('/')
    const lastPathArray = lastPath.split('/')
    const test = lastPathArray.filter(
      (lastPath) => pathArray.indexOf(lastPath) === -1
    )[0]
    const a = pathArray.join('/') + test
    const result = ipcRenderer.sendSync('onClick', {
      path: a,
    })
    setFolderList(() => {
      return result.folderList
    })
    setNowPath(a + '/')
  }
}

const handleBlur = (
  event: React.ChangeEvent<HTMLInputElement>,
  nowPath: string,
  setLastPath: React.Dispatch<React.SetStateAction<string>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>,
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>
) => {
  const path = event.currentTarget.value
  const pathArray = path.split('/')
  pathArray.length = pathArray.length - 1
  const beforePath = pathArray.join('/')
  const result = ipcRenderer.sendSync('onChange', {
    path: path,
  })
  if (!result.flag) {
    setNowPath(beforePath + '/')
    setLastPath(beforePath + '/')
  } else {
    setNowPath(path + '/')
    setLastPath(path + '/')
    setFolderList(result.folderList)
  }
}

const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setLastPath: React.Dispatch<React.SetStateAction<string>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>
) => {
  const path = event.currentTarget.value
  setNowPath(path)
  setLastPath(path)
}

const handleBlurFilter = (
  event: React.ChangeEvent<HTMLInputElement>,
  folderList: Array<FileInfo>,
  setFilteredFolderList: React.Dispatch<
    React.SetStateAction<Array<FileInfo> | null>
  >
) => {
  const filterText = event.currentTarget.value
  if (filterText === '') {
    setFilteredFolderList(null)
    return
  }
  const filteredFolderList = folderList.filter((folder) => {
    if (folder.fileName !== undefined) {
      return folder.fileName.includes(filterText)
    }
  })
  console.log(filteredFolderList)
  setFilteredFolderList(filteredFolderList)
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
