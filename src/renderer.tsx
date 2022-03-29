import React, { useState } from 'react'
import { render } from 'react-dom'

import './styles.css'
import TabMenu from './component/tabMenu'
import SelectMenu from './component/selectMenu'
import TextFieldsMenu from './component/textFieldsMenu'
import PanelMenu from './component/panelMenu'
import MainContent from './component/mainContent'
import { ipcRenderer } from './@types/ipcRender'

const App = (): JSX.Element => {
  const [path, setPath] = useState('c://Users/user/')
  const [folderList, setFolderList] = useState([])
  ipcRenderer.on('getFolder', (err, args) => {
    console.log('aa')
    setFolderList(folderList.concat(args))
  })

  const handleClick = (event: React.MouseEvent): void => {
    const tmpPath = `${path}${event.currentTarget.textContent}/`
    setPath(tmpPath)
    setFolderList(() => {
      return ipcRenderer.sendSync('onClick', {
        path: tmpPath,
      })
    })
  }

  return (
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
          handleClick={handleClick}
          folderList={folderList}
        ></MainContent>
      </div>
    </>
  )
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
