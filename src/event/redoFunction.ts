import { ipcRenderer } from 'electron'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'

/**
 *やり直し処理処理
 *
 * @param stateList -stateList
 *
 * @param exportFunctions -exportFunctions
 */
const redoFunction = (
  stateList: StateList,
  exportFunctions: StateListFunctions
) => {
  const nowPath = stateList.nowPath
  const lastPath = stateList.lastPath
  if (nowPath !== '' && nowPath !== lastPath) {
    const pathArray = nowPath.split('/')
    const lastPathArray = lastPath.split('/')
    const test = lastPathArray.filter(
      (lastPath) => pathArray.indexOf(lastPath) === -1
    )[0]
    const a = pathArray.join('/') + test
    const result = ipcRenderer.sendSync('onClick', {
      path: a,
    })
    exportFunctions.setFolderList(result.folderList)
    exportFunctions.setNowPath(a + '/')
  }
}
export default redoFunction
