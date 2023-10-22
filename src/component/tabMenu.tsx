import React, { useState } from 'react'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import TabUnstyled from '@mui/base/TabUnstyled'

/**
 *tab表示用コンポーネント
 * @returns jsx
 */
const TabMenu = (): JSX.Element => {
  const [tabList, setTabList] = useState<JSX.Element[]>([])

  const handleClick = () => {
    const tab = <TabUnstyled>デスクトップ</TabUnstyled>
    setTabList(tabList.concat(tab))
  }
  return (
    <div style={{ width: '70%' }}>
      <TabsUnstyled defaultValue={0}>
        <TabsListUnstyled>
          <TabUnstyled>One</TabUnstyled>
          {tabList.map((tab, i) => {
            return <TabUnstyled key={i}>デスクトップ</TabUnstyled>
          })}
          <button onClick={handleClick}>+</button>
        </TabsListUnstyled>
        <TabPanelUnstyled value={0}>First content</TabPanelUnstyled>
        {tabList.map((tab, i) => {
          return (
            <TabPanelUnstyled key={i} value={i + 1}>{`${i}`}</TabPanelUnstyled>
          )
        })}
      </TabsUnstyled>
    </div>
  )
}
export default TabMenu
