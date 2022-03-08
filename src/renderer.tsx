import React, { MouseEventHandler, useState } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import TabMenu from './component/tabMenu'
import SelectMenu from './component/selectMenu'
import TextFieldsMenu from './component/textFieldsMenu'
import PanelMenu from './component/panelMenu'
import MainContent from './component/mainContent'
import { ipcRenderer } from './@types/ipcRender'

const electron = window.require('electron')

const App = (): JSX.Element => {
  const test = {}
  const [folderList, setFolderList] = useState([])
  ipcRenderer.on('getFolder', (err, args) => {
    console.log('aa')
    setFolderList(folderList.concat(args))
  })

  const handleClick = (event: React.MouseEvent): void => {
    console.log(`c://Users/user/${event.currentTarget.textContent}/`)
    const path = `c://Users/user/${event.currentTarget.textContent}/`
    setFolderList(() => {
      return ipcRenderer.sendSync('onClick', {
        path: path
      })
    })
  }

  return (
    <>
      <div style={{ backgroundColor: '#F0F0F0' }}>
        <div className='test'>
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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
