// TODO:コンポーネントごとのrequestObjectを作る

import React from 'react'
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
import { useInitStateList, useInitRefList } from './util/stateList'
import DiaLogMenuRequest from './request/DiaLogmenuRequest'
import MainContentRequest from './request/MainContentRequest'
import TextFilterMenuRequest from './request/TextFilterMenuRequest'
import PathTextMenuRequest from './request/pathTextmenuRequest'
import SideMenuRequest from './request/SideMenuRequest'
import PanelMenuRequest from './request/PanelMenuRequest'
/**
 * レンダラー
 *
 * @returns  jsx
 */
const App = (): JSX.Element => {
  const [stateList, exportFunctions] = useInitStateList()
  const refList = useInitRefList()

  const drawerWidth = 240
  // データ受信
  ipcRenderer.once('sendDataMain', (err, data) => {
    const tmpMap = new Map<number, Array<FileInfo>>([[0, data.folderList]])

    const dataMap = new Map<string, Map<number, Array<FileInfo>>>([
      ['0', tmpMap],
    ])

    const cloneMap = new Map(stateList.sideMenuFolderList)
    cloneMap.set('firstKey', dataMap)
    exportFunctions.setFlag(data.flags)
    exportFunctions.setFolderList(data.folderList)
    exportFunctions.setSideMenuFolderList(cloneMap)
    exportFunctions.setVolumeLabelList(data.volumeLabelList)
  })
  // データ受信
  ipcRenderer.once('sendDataNormal', (err, data) => {
    exportFunctions.setProgramNameList(data.programNameList)
    exportFunctions.setLastPath(data.path)
    exportFunctions.setFlag(data.flags)
    exportFunctions.setIconList(data.iconList)
  })

  return (
    <>
      {stateList.flag ? (
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
                    panelMenuRequest={PanelMenuRequest(
                      stateList,
                      exportFunctions
                    )}
                  ></PanelMenu>
                  {
                    <PathTextMenu
                      pathTextMenuRequest={PathTextMenuRequest(
                        stateList,
                        exportFunctions
                      )}
                    ></PathTextMenu>
                  }
                  {
                    <TextFilterMenu
                      textFilterMenuRequest={TextFilterMenuRequest(
                        stateList,
                        exportFunctions
                      )}
                    ></TextFilterMenu>
                  }
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
                sideMenuRequest={SideMenuRequest(
                  stateList,
                  refList,
                  exportFunctions
                )}
              ></SideMenu>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <MainContent
              mainContentRequest={MainContentRequest(
                stateList,
                exportFunctions
              )}
            ></MainContent>
          </Box>
        </Box>
      ) : (
        <div>
          <Dialog diaLogMenuRequest={DiaLogMenuRequest(stateList)}></Dialog>
        </div>
      )}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<App></App>)
