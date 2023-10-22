import { ipcRenderer } from 'electron'
import StateListFunctions from '../@types/stateListFunctions'

/**
 *blurEvent処理
 *
 * @param event -event
 *
 * @param exportFunctions -exportFunctions
 */
const handleBlur = (
  event: React.ChangeEvent<HTMLInputElement>,
  exportFunctions: StateListFunctions
) => {
  const path = event.currentTarget.value
  const pathArray = path.split('/')
  pathArray.length = pathArray.length - 1
  const beforePath = pathArray.join('/')
  const result = ipcRenderer.sendSync('onChange', {
    path: path,
  })
  if (!result.flag) {
    exportFunctions.setNowPath(beforePath + '/')
    exportFunctions.setLastPath(beforePath + '/')
  } else {
    exportFunctions.setNowPath(path + '/')
    exportFunctions.setLastPath(path + '/')
    exportFunctions.setFolderList(result.folderList)
  }
}
export default handleBlur
