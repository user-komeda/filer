import { ipcRenderer } from 'electron'
import StateListRequest from '../@types/sideMenuClickRequestValue'

/**
 *サイドメニュークリック処理
 *
 * @param event -event
 *
 * @param requestValue -requestValue
 */
const handleSideMenuClick = (
  event: React.MouseEvent,
  requestValue: StateListRequest
) => {
  const filePath =
    event.currentTarget.parentNode?.children[2].getAttribute('data-path') ?? ''
  const result = ipcRenderer.sendSync('onClick', {
    path: filePath,
  })
  requestValue.setNowPath(filePath + '/')
  requestValue.setLastPath(filePath + '/')
  requestValue.setFolderList(() => {
    return result.folderList
  })
}
export default handleSideMenuClick
