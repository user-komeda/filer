import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import TabContext from '@mui/lab/TabContext'
import TabMenu from './component/tabMenu'
import SelectMenu from './component/selectMenu'
import TextFieldsMenu from './component/textFieldsMenu'
import PanelMenu from './component/panelMenu'
import MainContent from './component/mainContent'

const App = (): JSX.Element => {
  const test = {}
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
