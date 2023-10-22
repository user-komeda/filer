import { ipcRenderer } from 'electron'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'

/**
 *戻る処理
 *
 * @param stateList -stateList
 *
 * @param exportFunctions -exportFunctions
 */
const undoFunction = (
  stateList: StateList,
  exportFunctions: StateListFunctions
) => {
  const tmpPath = stateList.nowPath
    ? stateList.nowPath.split('/')
    : stateList.lastPath.split('/')
  tmpPath.unshift()
  tmpPath.length = tmpPath.length - 2
  const path = tmpPath.join('/')
  const result = ipcRenderer.sendSync('onClick', {
    path: path,
  })
  exportFunctions.setNowPath(path + '/')

  exportFunctions.setFolderList(result.folderList)
}
export default undoFunction
