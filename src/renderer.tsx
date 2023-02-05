import React, { useState, useRef } from 'react'
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
import { CssBaseline, Toolbar, AppBar } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import RequestValue from './@types/sideMenuClickReqestValue'

/**
 * レンダラープロセス
 */
const App = (): JSX.Element => {
  const [lastPath, setLastPath] = useState('c:/Users/user/')
  const [nowPath, setNowPath] = useState('')
  const [folderList, setFolderList] = useState<Array<FileInfo>>([])
  const [sideMenuFolderList, setSideMenuFolderList] = useState<
    Map<string, Map<number, Array<FileInfo>>>
  >(new Map())
  const [filteredFolderList, setFilteredFolderList] =
    useState<Array<FileInfo> | null>(null)
  const [flag, setFlag] = useState()
  const [programNameList, setProgramNameList] = useState([])
  const [iconList, setIconList] = useState<Array<string>>([])
  const [isSortTypeAsc, setSortType] = useState(true)
  const [volumeLabelList, setVolumeLabelList] = useState<Array<string>>([])
  const [clickedFolder, setClickedFolder] = useState<Array<string>>([])
  const sameFolderDeletedFlag = useRef(true)
  const row = useRef(-1)
  const sideMenuFolderPath = useRef('')

  const drawerWidth = 240

  ipcRenderer.once('sendDataMain', (err, data) => {
    const tmpMap = new Map<number, Array<FileInfo>>([[0, data.folderList]])
    setFlag(data.flags)
    setFolderList(data.folderList)
    setSideMenuFolderList(() => {
      sideMenuFolderList.set('firstKey', tmpMap)
      return sideMenuFolderList
    })
    setVolumeLabelList(data.volumeLabelList)
  })

  ipcRenderer.once('sendDataNormal', (err, data) => {
    setProgramNameList(data.programNameList)
    setLastPath(data.path)
    setFlag(data.flags)
    setIconList(data.iconList)
  })

  const requestValue: RequestValue = {
    sideMenuFolderList,
    clickedFolder,
    sameFolderDeletedFlag,
    row,
    sideMenuFolderPath,
    setLastPath,
    setNowPath,
    setSideMenuFolderList,
    setClickedFolder,
  }
  return (
    <>
      {flag ? (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <div style={{ backgroundColor: '#F0F0F0', color: 'black' }}>
              <div>
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
              </div>
              <div>
                <TabMenu></TabMenu>
              </div>
            </div>
          </AppBar>
          <Drawer
            variant="permanent"
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
              <SideMenu
                folderList={sideMenuFolderList}
                volumeLabelList={volumeLabelList}
                clickedFolder={clickedFolder}
                handleClick={(event: React.MouseEvent) => {
                  handleSideMenuClick(event, requestValue)
                }}
              ></SideMenu>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
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
              sortFunction={(event: React.MouseEvent) => {
                sort(event, folderList, isSortTypeAsc, setSortType)
              }}
            ></MainContent>
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
  requestValue: RequestValue
) => {
  console.log(requestValue.sideMenuFolderList)
  const targetTagName = event.currentTarget.children[0].tagName
  const basePath = 'c://Users/user/'
  const targetValue = event.currentTarget.textContent ?? ''
  const targetChildValue =
    event.currentTarget.nextElementSibling?.children[0].textContent ?? ''
  const clickedContentValue =
    targetValue === '' ? targetChildValue : targetValue
  const menuFolderList =
    requestValue.sideMenuFolderList.get(clickedContentValue) ??
    new Map<number, Array<FileInfo>>()
  const mapSize = menuFolderList.size
  const lastFolderList =
    menuFolderList.get(mapSize - 1) ?? new Array<FileInfo>()
  const flag = lastFolderList?.some((fileInfo) => {
    fileInfo.fileName === clickedContentValue
  })
  const firstFolderList =
    requestValue.sideMenuFolderList.get('firstKey')?.get(0) ?? []

  const filePath =
    event.currentTarget.parentNode?.children[2].getAttribute('data-path') ?? ''

  const rowCount =
    Number(
      event.currentTarget.parentNode?.children[2].getAttribute('data-row')
    ) ?? 0

  const folderParentName =
    event.currentTarget.parentNode?.children[2].getAttribute(
      'data-parent-folder'
    ) ?? clickedContentValue
  const splitFilePath = filePath.split('/')

  const splitFilePathLength = splitFilePath.length

  const [path] = generatePath(
    mapSize,
    clickedContentValue,
    filePath,
    splitFilePath,
    flag
  )
  const firstFolderFlag = firstFolderList.some((folder) => {
    folder.fileName === clickedContentValue &&
      clickedContentValue === folderParentName
  })
  if (
    clickedContentValue ===
      requestValue.clickedFolder[requestValue.clickedFolder.length - 1] ||
    firstFolderFlag
  ) {
    if (requestValue.sameFolderDeletedFlag.current === true) {
      setInitValue(
        path,
        rowCount,
        deleteWhenCClickedFolderIsSame(
          folderParentName ?? '',
          requestValue.sideMenuFolderList,
          rowCount
        ),
        requestValue.row,
        requestValue.sideMenuFolderPath,
        requestValue.setSideMenuFolderList
      )
      requestValue.sameFolderDeletedFlag.current =
        !requestValue.sameFolderDeletedFlag.current
      return
    }
    requestValue.sameFolderDeletedFlag.current =
      !requestValue.sameFolderDeletedFlag.current
  }
  const result = ipcRenderer.sendSync('onClick', {
    path: path,
  })

  if (result.folderList === null) {
    return
  }

  requestValue.setClickedFolder(() => {
    return requestValue.clickedFolder.concat(clickedContentValue)
  })
  if (targetTagName === 'svg') {
    const sideMenuPath = requestValue.sideMenuFolderPath.current
    if (sideMenuPath !== '') {
      console.log('insert')
      console.log(requestValue.sideMenuFolderList)
      const splitSideMenuPath = sideMenuPath.split('/')
      console.log(splitSideMenuPath)
      if (splitSideMenuPath[splitSideMenuPath.length - 1] === '') {
        splitSideMenuPath.pop()
      }
      const count = splitSideMenuPath.length + 1 - splitFilePathLength
      if (count > 1) {
        // console.log('delete')
        // for (let i = 0; i < count; i++) {
        //   requestValue.sideMenuFolderList
        //     .get(folderParentName ?? clickedContentValue)
        //     ?.delete(mapSize - 1)
        // }
        // requestValue.setSideMenuFolderList(() => {
        //   return new Map<string, Map<number, Array<FileInfo>>>(
        //     requestValue.sideMenuFolderList
        //   )
        // })
        return
      } else {
        console.log(requestValue.sideMenuFolderList)
        const updateMap = new Map<string, Map<number, Array<FileInfo>>>(
          requestValue.sideMenuFolderList
        )
        console.log(requestValue.sideMenuFolderList)

        console.log(updateMap)
        if (requestValue.row.current === rowCount) {
          console.log('bbb')
          // if (menuFolderList.has(rowCount + 1)) {
          //   updateMap
          //     .get(folderParentName ?? clickedContentValue)
          //     ?.delete(rowCount + 1)
          // }
          console.log(updateMap)

          const tmpMap = updateMap.get(folderParentName ?? clickedContentValue)
          console.log(folderParentName)
          console.log(tmpMap)
          if (tmpMap) {
            updateMap
              .get(folderParentName ?? clickedContentValue)
              ?.set(rowCount + 1, result.folderList)
          } else {
            console.log('dsjfgp;j')
            const tmpMap = new Map<number, FileInfo[]>()
            tmpMap.set(1, result.folderList)
            updateMap.set(folderParentName ?? clickedContentValue, tmpMap)
            console.log(updateMap)
          }

          requestValue.setSideMenuFolderList(() => {
            return new Map<string, Map<number, Array<FileInfo>>>(updateMap)
          })
        } else {
          console.log(requestValue.sideMenuFolderList)
          console.log('ccc')
          updateMap
            .get(folderParentName ?? clickedContentValue)
            ?.set(rowCount + 1, result.folderList)
          console.log(updateMap)

          requestValue.setSideMenuFolderList(() => {
            return new Map<string, Map<number, Array<FileInfo>>>(updateMap)
          })
        }
      }
      requestValue.sideMenuFolderPath.current = path
      requestValue.row.current = rowCount
      return
    }
    const updateMap = requestValue.sideMenuFolderList
    console.log('aa')
    const tmpMap = new Map<number, Array<FileInfo>>([
      [rowCount + 1, result.folderList],
    ])
    updateMap.set(folderParentName ?? clickedContentValue, tmpMap)
    requestValue.setSideMenuFolderList(() => {
      return new Map<string, Map<number, Array<FileInfo>>>(updateMap)
    })
    requestValue.row.current = rowCount
    requestValue.sideMenuFolderPath.current = path
  } else {
    requestValue.setNowPath(`${basePath}${clickedContentValue}`)
    requestValue.setLastPath(`${basePath}${clickedContentValue}`)
  }
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
  setFilteredFolderList(filteredFolderList)
}

const sort = (
  event: React.MouseEvent,
  folderList: Array<FileInfo>,
  isSortTypeAsc: boolean,
  setSortType: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const sortTarget = event.currentTarget.id
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

const generatePath = (
  mapSize: number,
  clickedContentValue: string,
  filePath: string,
  spiltFilePath: Array<string>,
  flag: boolean
): [string, number] => {
  const basePath = 'c://Users/user/'
  const path =
    mapSize === 1
      ? `${basePath}${clickedContentValue}`
      : `${
          filePath === ''
            ? basePath
            : flag
            ? spiltFilePath[spiltFilePath.length - 1]
            : filePath
        }/${
          clickedContentValue === spiltFilePath[spiltFilePath.length - 1]
            ? ''
            : clickedContentValue
        }`
  const pathArray = path.split('/')
  if (pathArray[pathArray.length - 1] === '') {
    pathArray.pop()
  }
  return [pathArray.join('/'), -0]
}

const deleteWhenCClickedFolderIsSame = (
  folderParentName: string,
  folderList: Map<string, Map<number, Array<FileInfo>>>,
  rowCount: number
) => {
  console.log(folderParentName)
  console.log(folderList)
  const sideMenuFolderList = new Map<string, Map<number, Array<FileInfo>>>(
    folderList
  )
  sideMenuFolderList.get(folderParentName)?.delete(rowCount + 1)
  console.log(sideMenuFolderList.get(folderParentName))
  return sideMenuFolderList
}

const setInitValue = (
  path: string,
  rowCount: number,
  sideMenuFolderList: Map<string, Map<number, Array<FileInfo>>>,
  row: React.MutableRefObject<number>,
  sideMenuFolderPath: React.MutableRefObject<string>,
  setSideMenuFolderList: React.Dispatch<
    React.SetStateAction<Map<string, Map<number, Array<FileInfo>>>>
  >
) => {
  setSideMenuFolderList(() => {
    // const sideMenuFolderList = sideMenuFolderList
    return new Map<string, Map<number, Array<FileInfo>>>(sideMenuFolderList)
  })
  row.current = rowCount
  sideMenuFolderPath.current = path
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const conrainer = document.getElementById('root')!
const root = createRoot(conrainer)
root.render(<App></App>)
