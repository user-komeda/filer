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

const App = (): JSX.Element => {
  return (
    <div>
      <div>
        <TabMenu></TabMenu>
      </div>
      <div>
        <SelectMenu></SelectMenu>
      </div>
      <div></div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
