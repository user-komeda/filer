import React from 'react'

import { ipcRenderer } from '../@types/ipcRender'
import DiaLogMenuRequest from '../request/DiaLogmenuRequest'
import { iconFolderPath } from '../const/const'

/**
 *ダイアログ表示コンポーネント
 *
 * @param props - props
 *
 * @returns jsx
 */
const Dialog: React.FC<{
  diaLogMenuRequest: DiaLogMenuRequest
}> = (props) => {
  const diaLogMenuRequest = props.diaLogMenuRequest
  return (
    <div>
      <ul>
        {diaLogMenuRequest.programNameList.map((programName, key) => {
          view(programName, key, diaLogMenuRequest)
        })}
      </ul>
    </div>
  )
}

const view = (
  programName: string,
  key: number,
  diaLogMenuRequest: DiaLogMenuRequest
) => {
  return (
    <li key={key}>
      <div onClick={handleClick}>
        <img src={`${iconFolderPath}${diaLogMenuRequest.iconList[key]}`} />
        <span>{programName}</span>
      </div>
    </li>
  )
}

const handleClick = (event: React.MouseEvent) => {
  const test = event.currentTarget

  ipcRenderer.sendSync('clickedProgramList', test.childNodes[1].textContent)
}
export default Dialog
