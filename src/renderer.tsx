import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'
import TabMenu from './component/tabMenu'
import PathTextMenu from './component/pathTextMenu'
import TextFilterMenu from './component/textFilterMenu'
import PanelMenu from './component/panelMenu'
import MainContent from './component/mainContent'
import Dialog from './component/dialog'
import SideMenu from './component/sideMenu'
import { ipcRenderer } from './@types/ipcRender'
import FileInfo from './@types/fileInfo'
import { Box } from '@mui/system'
import {
  CssBaseline,
  Toolbar,
  AppBar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material'
import Drawer from '@mui/material/Drawer'
import fs from 'fs'

/**
 * レンダラープロセス
 */
const App = (): JSX.Element => {
  const [lastPath, setLastPath] = useState('c:/Users/user/')
  const [nowPath, setNowPath] = useState('')
  const [folderList, setFolderList] = useState<Array<FileInfo>>([])
  const [sideMenuFolderList, setSideMenuFolderList] = useState<Array<FileInfo>>(
    []
  )
  const [filteredFolderList, setFilteredFolderList] = useState<Array<
    FileInfo
  > | null>(null)
  const [flag, setFlag] = useState()
  const [programNameList, setProgramNameList] = useState([])
  const [iconList, setIconList] = useState<Array<string>>([])
  const [isSortTypeAsc, setSortType] = useState(true)
  const [volumeLabelList, setVolumeLabelList] = useState<Array<string>>([])
  const [clickedFolder, setClickedFolder] = useState<string>('')

  const drawerWidth = 240

  ipcRenderer.once('sendDataMain', (err, data) => {
    setFlag(data.flags)
    setFolderList(data.folderList)
    setSideMenuFolderList(() => {
      return sideMenuFolderList.length === 0
        ? data.folderList
        : sideMenuFolderList
    })
    setVolumeLabelList(data.volumeLabelList)
  })

  ipcRenderer.once('sendDataNormal', (err, data) => {
    setProgramNameList(data.programNameList)
    setLastPath(data.path)
    setFlag(data.flags)
    setIconList(data.iconList)
  })
  return (
    <>
      {flag ? (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position='fixed'
            sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
          >
            <div style={{ backgroundColor: '#F0F0F0', color: 'black' }}>
              <div>
                <div className='test'>
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
                    handleBlur={event => {
                      handleBlur(
                        event,
                        nowPath,
                        setLastPath,
                        setNowPath,
                        setFolderList
                      )
                    }}
                    handleChange={event => {
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
              </div>
              <div>
                <TabMenu></TabMenu>
              </div>
            </div>
          </AppBar>
          <Drawer
            variant='permanent'
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              ;
              <SideMenu
                folderList={sideMenuFolderList}
                volumeLabelList={volumeLabelList}
                clickedFolder={clickedFolder}
                handleClick={(event: React.MouseEvent) => {
                  handleSideMenuClick(
                    event,
                    setLastPath,
                    setNowPath,
                    setSideMenuFolderList,
                    setClickedFolder
                  )
                }}
              ></SideMenu>
            </Box>
          </Drawer>
          <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Typography paragraph>
              <MainContent
                handleClick={event => {
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
                sortFunction={(event: React.MouseEvent) => {
                  sort(event, folderList, isSortTypeAsc, setSortType)
                }}
              ></MainContent>
            </Typography>
          </Box>
        </Box>
      ) : (
        <div>
          <Dialog
            programNameList={programNameList}
            path={nowPath}
            iconList={iconList}
          ></Dialog>
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

const handleSideMenuClick = (
  event: React.MouseEvent,
  setLastPath: React.Dispatch<React.SetStateAction<string>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>,
  setSideMenuFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>,
  setClickedFolder: React.Dispatch<React.SetStateAction<string>>
) => {
  const basePath = 'c://Users/user/'
  const targetValue = event.currentTarget.textContent ?? ''
  const path = `${basePath}${targetValue}`

  const result = ipcRenderer.sendSync('onClick', {
    path: path,
  })

  setLastPath(`${basePath}${targetValue}`)
  setNowPath(`${basePath}${targetValue}`)
  setSideMenuFolderList(() => {
    return result.folderList
  })
  setClickedFolder(targetValue)
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
      lastPath => pathArray.indexOf(lastPath) === -1
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
  const filteredFolderList = folderList.filter(folder => {
    if (folder.fileName !== undefined) {
      return folder.fileName.includes(filterText)
    }
  })
  console.log(filteredFolderList)
  setFilteredFolderList(filteredFolderList)
}

const sort = (
  event: React.MouseEvent,
  folderList: Array<FileInfo>,
  isSortTypeAsc: boolean,
  setSortType: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const sortTarget = event.currentTarget.id
  console.log(sortTarget)
  console.log('click')
  switch (sortTarget) {
    case 'fileName':
      sortByName(folderList, isSortTypeAsc)
      break
    case 'fileUpdateTime':
      sortByUpdateTime(folderList, isSortTypeAsc)
      break
    case 'fileType':
      sortByFileType(folderList, isSortTypeAsc)
      break
    case 'fileSize':
      sortByFileSize(folderList, isSortTypeAsc)
      break
  }
  setSortType(!isSortTypeAsc)
}

const sortByName = (folderList: Array<FileInfo>, isSortTypeAsc: boolean) => {
  folderList.sort((a, b) => {
    if (a.fileName === undefined || b.fileName === undefined) {
      return 0
    }
    if (isSortTypeAsc) {
      return a.fileName.toUpperCase() < b.fileName.toUpperCase() ? -1 : 1
    } else {
      return a.fileName.toUpperCase() > b.fileName.toUpperCase() ? -1 : 1
    }
  })
}

const sortByFileSize = (
  folderList: Array<FileInfo>,
  isSortTypeAsc: boolean
) => {
  console.log('ss')

  folderList.sort((a, b) => {
    if (a.fileSize === undefined || b.fileSize === undefined) {
      return 0
    }
    if (isSortTypeAsc) {
      return a.fileSize - b.fileSize
    } else {
      return b.fileSize - a.fileSize
    }
  })
}

const sortByFileType = (
  folderList: Array<FileInfo>,
  isSortTypeAsc: boolean
) => {
  folderList.sort((a, b) => {
    if (a.fileType === undefined || b.fileType === undefined) {
      return 0
    }
    if (isSortTypeAsc) {
      return a.fileType < b.fileType ? -1 : 1
    } else {
      return a.fileType > b.fileType ? -1 : 1
    }
  })
}

const sortByUpdateTime = (
  folderList: Array<FileInfo>,
  isSortTypeAsc: boolean
) => {
  folderList.sort((a, b) => {
    if (a.updateFileTime === undefined || b.updateFileTime === undefined) {
      return 0
    }
    if (isSortTypeAsc) {
      return a.updateFileTime < b.updateFileTime ? -1 : 1
    } else {
      return a.updateFileTime > b.updateFileTime ? -1 : 1
    }
  })
}
const conrainer = document.getElementById('root')!
const root = createRoot(conrainer)
root.render(<App></App>)
