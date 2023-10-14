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
import StateListRequest from './@types/sideMenuClickRequestValue'
import { basePath } from './const/const'
import handleSideMenuClick from './event/handleSideMenuClick'
import handleClick from './event/handleClick'
import handleSideMenuSvgClick from './event/handleSideMenuSvgClick'
import undoFunction from './event/undoFunction'
import redoFunction from './event/redoFunction'
import handleBlur from './event/handleBlur'
import handleChange from './event/handleChange'
import handleBlurFilter from './event/handleBlurFilter'
import sort from './event/sort'

/**
 * レンダラー
 *
 * @returns  jsx
 */
const App = (): JSX.Element => {
  // 最後のパス
  const [lastPath, setLastPath] = useState(basePath)
  // 現在のパス
  const [nowPath, setNowPath] = useState('')
  // folderList
  const [folderList, setFolderList] = useState<Array<FileInfo>>([])
  //サイドメニューfolderList
  const [sideMenuFolderList, setSideMenuFolderList] = useState<
    Map<string, Map<string, Map<number, Array<FileInfo>>>>
  >(new Map())
  // filterFolderList
  const [filteredFolderList, setFilteredFolderList] =
    useState<Array<FileInfo> | null>(null)
  // flag
  const [flag, setFlag] = useState()
  // programList
  const [programNameList, setProgramNameList] = useState([])
  // programIcon
  const [iconList, setIconList] = useState<Array<string>>([])
  // ソートタイプ
  const [isSortTypeAsc, setSortType] = useState(true)
  // ボリュームラベル
  const [volumeLabelList, setVolumeLabelList] = useState<Array<string>>([])
  // clickFolder
  const [clickedFolder, setClickedFolder] = useState<Array<string>>([])
  // 同一フォルダクリックフラグ
  const sameFolderDeletedFlag = useRef(true)
  //row
  const row = useRef(-1)
  // サイドメニューパス
  const sideMenuFolderPath = useRef('')
  // colCOuntList
  const [colCountList, setColCountList] = useState<Array<string>>([])
  // rowCOuntList
  const [rowCountList, setRowCountList] = useState<Array<number>>([])

  const drawerWidth = 240

  // データ受信
  ipcRenderer.once('sendDataMain', (err, data) => {
    const tmpMap = new Map<number, Array<FileInfo>>([[0, data.folderList]])

    const dataMap = new Map<string, Map<number, Array<FileInfo>>>([
      ['0', tmpMap],
    ])
    setFlag(data.flags)
    setFolderList(data.folderList)
    setSideMenuFolderList(() => {
      sideMenuFolderList.set('firstKey', dataMap)
      return sideMenuFolderList
    })
    setVolumeLabelList(data.volumeLabelList)
  })

  // データ受信
  ipcRenderer.once('sendDataNormal', (err, data) => {
    setProgramNameList(data.programNameList)
    setLastPath(data.path)
    setFlag(data.flags)
    setIconList(data.iconList)
  })

  // requestValue
  const requestValue: StateListRequest = {
    sideMenuFolderList,
    clickedFolderList: clickedFolder,
    sameFolderDeletedFlag,
    row,
    sideMenuFolderPath,
    colCountList,
    rowCountList,
    setLastPath,
    setNowPath,
    setSideMenuFolderList,
    setClickedFolderList: setClickedFolder,
    setColCountList,
    setRowCountList,
    setFolderList,
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
                      handleBlur(event, setLastPath, setNowPath, setFolderList)
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
                colCountList={colCountList}
                handleSideMenuSvgClick={(event: React.MouseEvent) => {
                  handleSideMenuSvgClick(event, requestValue)
                }}
                handleSideMenuClick={(event: React.MouseEvent) => {
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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<App></App>)
