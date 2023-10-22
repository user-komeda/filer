import React from 'react'
import PanelMenuRequest from '../request/PanelMenuRequest'

/**
 *panel部表示コンポーネント
 *
 * @param props - props
 *
 * @returns jsx
 */
const PanelMenu: React.FC<{
  panelMenuRequest: PanelMenuRequest
}> = props => {
  return (
    <div style={{ width: '15%' }}>
      <button
        style={{ width: '25%' }}
        onClick={props.panelMenuRequest.undoFunction}
      >
        ←
      </button>
      <button
        style={{ width: '25%' }}
        onClick={props.panelMenuRequest.redoFunction}
      >
        →
      </button>
      <button style={{ width: '25%' }}>↑</button>
      <button style={{ width: '25%' }}>開く</button>
    </div>
  )
}

export default PanelMenu
