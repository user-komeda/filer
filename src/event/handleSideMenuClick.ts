import { ipcRenderer } from 'electron'
import StateListFunctions from '../@types/stateListFunctions'

/**
 *サイドメニュークリック処理
 *
 * @param event -event
 *
 * @param exportFunctions -exportFunctions
 */
const handleSideMenuClick = (
  event: React.MouseEvent,
  exportFunctions: StateListFunctions
) => {
  const filePath =
    event.currentTarget.parentNode?.children[2].getAttribute('data-path') ?? ''
  const result = ipcRenderer.sendSync('onClick', {
    path: filePath,
  })
  exportFunctions.setNowPath(filePath + '/')
  exportFunctions.setLastPath(filePath + '/')
  exportFunctions.setFolderList(result.folderList)
}
export default handleSideMenuClick
