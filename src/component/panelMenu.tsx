import React from 'react'

/**
 *panel部表示コンポーネント
 *
 * @param props - props
 *
 * @returns jsx
 */
const PanelMenu: React.FC<{
  undoFunction: (e: React.MouseEvent) => void
  redoFunction: (e: React.MouseEvent) => void
}> = (props) => {
  return (
    <div style={{ width: '15%' }}>
      <button style={{ width: '25%' }} onClick={props.undoFunction}>
        ←
      </button>
      <button style={{ width: '25%' }} onClick={props.redoFunction}>
        →
      </button>
      <button style={{ width: '25%' }}>↑</button>
      <button style={{ width: '25%' }}>開く</button>
    </div>
  )
}

export default PanelMenu
