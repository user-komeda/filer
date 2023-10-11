import React from 'react'

import { ipcRenderer } from '../@types/ipcRender'

/**
 *
 * @param props - props
 */
const Dialog: React.FC<{
  programNameList: Array<string>
  path: string
  iconList: Array<string>
}> = (props) => {
  const programNameList = props.programNameList
  const iconFolderPath = 'c:/Users/user/Desktop/learning/electron/filer/icon/'
  const iconList = props.iconList

  return (
    <div>
      <ul>
        {programNameList.map((programName, key) => {
          if (programName) {
            return (
              <li key={key}>
                <div onClick={handleClick}>
                  <img src={`${iconFolderPath}${iconList[key]}`} />
                  <span>{programName}</span>
                </div>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

const handleClick = (event: React.MouseEvent) => {
  const test = event.currentTarget

  ipcRenderer.sendSync('clickedProgramList', test.childNodes[1].textContent)
}
export default Dialog
