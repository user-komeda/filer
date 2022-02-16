import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import TabContext from '@mui/lab/TabContext'

const App = (): JSX.Element => {
  const [tabList, setTabCount] = useState<JSX.Element[]>([])
  const handleClick = () => {
    const test = [<Tab label='Item Two' value='2' />, <Tab></Tab>]

    setTabCount(tabList.concat(...test))
  }
  return (
    <>
      <TabContext value={'2'}>
        <Tabs aria-label='lab API tabs example'>
          <Tab label='Item One' value='1' />
          {tabList.map(tab => {
            return tab
          })}
          <Tab label='Item Two' value='2' />
          <Tab label='Item Three' value='3' />
          <button onClick={handleClick}>+</button>
        </Tabs>
        <TabPanel value='1'>Item One</TabPanel>
        <TabPanel value='2'>Item Two</TabPanel>
        <TabPanel value='3'>Item Three</TabPanel>
      </TabContext>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
