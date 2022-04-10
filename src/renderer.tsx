import React, { useState } from 'react'
import { render } from 'react-dom'

import './styles.css'
import TabMenu from './component/tabMenu'
import SelectMenu from './component/pathTextMenu'
import TextFieldsMenu from './component/textFilterMenu'
import PanelMenu from './component/panelMenu'
import MainContent from './component/mainContent'
import Dialog from './component/dialog'
import { ipcRenderer } from './@types/ipcRender'

/**
 * レンダラープロセス
 */
const App = (): JSX.Element => {
  const [path, setPath] = useState('c://Users/user/')
  const [folderList, setFolderList] = useState([])
  const [flag, setFlag] = useState()
  const [programNameList, setProgramNameList] = useState([])

  ipcRenderer.once('sendDataMain', (err, data) => {
    setFlag(data.flags)
    setFolderList(data.folderList)
  })

  ipcRenderer.once('sendDataNormal', (err, data) => {
    setProgramNameList(data.programNameList)
    setPath(data.path)
    setFlag(data.flags)
  })
  console.log(flag)
  return (
    <>
      {flag ? (
        <>
          <div style={{ backgroundColor: '#F0F0F0' }}>
            <div className="test">
              <PanelMenu></PanelMenu>
              <SelectMenu></SelectMenu>
              <TextFieldsMenu></TextFieldsMenu>
            </div>
            <div>
              <TabMenu></TabMenu>
            </div>
          </div>
          <div>
            <MainContent
              handleClick={(event) => {
                handleClick(event, path, setFolderList, setPath)
              }}
              folderList={folderList}
            ></MainContent>
          </div>
        </>
      ) : (
        <div>
          <Dialog programNameList={programNameList} path={path}></Dialog>
        </div>
      )}
    </>
  )
}

const handleClick = (
  event: React.MouseEvent,
  path: string,
  setFolderList: React.Dispatch<React.SetStateAction<never[]>>,
  setPath: React.Dispatch<React.SetStateAction<string>>
): void => {
  const tmpPath = `${path}${event.currentTarget.textContent}/`
  const result = ipcRenderer.sendSync('onClick', { path: tmpPath })
  if (!result.flag) {
    setPath(tmpPath)
  }
  setFolderList(() => {
    return result.folderList
  })
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
