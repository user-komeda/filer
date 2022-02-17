import Tab from '@mui/material/Tab'
import { useState } from 'react'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import TabUnstyled from '@mui/base/TabUnstyled'

const TabMenu = (): JSX.Element => {
  const [tabList, setTabList] = useState<JSX.Element[]>([])

  const handleClick = () => {
    const tab = <Tab label='デスクトップ'></Tab>
    setTabList(tabList.concat(tab))
  }
  return (
    <>
      <div>
        <button>←</button>
        <button>→</button>
        <button>↑</button>
        <button>開く</button>
      </div>
      <TabsUnstyled defaultValue={0}>
        <TabsListUnstyled>
          <TabUnstyled>One</TabUnstyled>
          <TabUnstyled>Two</TabUnstyled>
          <TabUnstyled>Three</TabUnstyled>
        </TabsListUnstyled>
        <TabPanelUnstyled value={0}>First content</TabPanelUnstyled>
        <TabPanelUnstyled value={1}>Second content</TabPanelUnstyled>
        <TabPanelUnstyled value={2}>Third content</TabPanelUnstyled>
      </TabsUnstyled>
    </>
  )
}
export default TabMenu
