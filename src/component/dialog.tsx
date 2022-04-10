import React from 'react'
import icon1 from '../../icon/0icon.bmp'
import icon2 from '../../icon/1icon.bmp'
import icon3 from '../../icon/2icon.bmp'
import icon4 from '../../icon/3icon.bmp'
import icon5 from '../../icon/4icon.bmp'
import icon6 from '../../icon/5icon.bmp'
import { ipcRenderer } from '../@types/ipcRender'

/**
 *
 * @param props props
 */
const Dialog: React.FC<{
  programNameList: Array<string>
  path: string
}> = (props) => {
  const programNameList = props.programNameList
  const iconList = [icon1, icon2, icon3, icon4, icon5, icon6]

  return (
    <div>
      <ul>
        {programNameList.map((programName, key) => {
          return (
            <li key={key}>
              <div onClick={handleClick}>
                <img src={iconList[key]} />
                <span>{programName}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const handleClick = (event: React.MouseEvent) => {
  const test = event.currentTarget

  console.log(test.childNodes[1].textContent)
  ipcRenderer.sendSync('clickedProgramList', test.childNodes[1].textContent)
}
export default Dialog
