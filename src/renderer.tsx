import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import TabMenu from './component/tabMenu'
import SelectMenu from './component/selectMenu'
import TextFieldsMenu from './component/textFieldsMenu'
import PanelMenu from './component/panelMenu'
import MainContent from './component/mainContent'
const electron = window.require('electron')

const App = (): JSX.Element => {
  const test = {}
  electron.ipcRenderer.on('getFolder', (err, args) => {
    console.log(args)
  })
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
        <MainContent></MainContent>
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
