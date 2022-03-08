import Tab from '@mui/material/Tab'
import { useState } from 'react'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import TabUnstyled from '@mui/base/TabUnstyled'

const TabMenu = (): JSX.Element => {
  const [tabList, setTabList] = useState<JSX.Element[]>([])

  const handleClick = (event: any) => {
    const tab = <TabUnstyled>デスクトップ</TabUnstyled>
    setTabList(tabList.concat(tab))
  }
  return (
    <div style={{ width: '70%' }}>
      <TabsUnstyled defaultValue={0}>
        <TabsListUnstyled>
          <TabUnstyled>One</TabUnstyled>
          {tabList.map(tab => {
            return <TabUnstyled>デスクトップ</TabUnstyled>
          })}
          <button onClick={handleClick}>+</button>
        </TabsListUnstyled>
        <TabPanelUnstyled value={0}>First content</TabPanelUnstyled>
        {tabList.map((tab, i) => {
          return <TabPanelUnstyled value={i + 1}>{`${i}`}</TabPanelUnstyled>
        })}
      </TabsUnstyled>
    </div>
  )
}
export default TabMenu
