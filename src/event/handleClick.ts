import { ipcRenderer } from 'electron'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'

/**
 * clickEvent処理
 *
 * @param event -event
 *
 * @param stateList -stateList
 *
 * @param exportFunctions -exportFunctions
 */
const handleClick = (
  event: React.MouseEvent,
  stateList: StateList,
  exportFunctions: StateListFunctions
) => {
  console.log('callHandleClick')
  const tmpPath = `${
    stateList.nowPath ? stateList.nowPath : stateList.lastPath
  }${event.currentTarget.textContent}`

  const result = ipcRenderer.sendSync('onClick', {
    path: tmpPath,
  })
  if (!result.isFile) {
    exportFunctions.setLastPath(tmpPath + '/')
    exportFunctions.setNowPath(tmpPath + '/')
  }
  exportFunctions.setFolderList(result.folderList)
}
export default handleClick
