import { ipcRenderer } from 'electron'
import FileInfo from '../@types/fileInfo'

/**
 * clickEvent処理
 *
 * @param event -event
 *
 * @param nowPath -nowPath
 *
 * @param lastPath -lastPath
 *
 * @param setFolderList -setFolderList
 *
 * @param setLastPath -setLastPath
 *
 * @param setNowPath -setNowPath
 */
const handleClick = (
  event: React.MouseEvent,
  nowPath: string,
  lastPath: string,
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>,
  setLastPath: React.Dispatch<React.SetStateAction<string>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>
) => {
  const tmpPath = `${nowPath ? nowPath : lastPath}${
    event.currentTarget.textContent
  }`

  const result = ipcRenderer.sendSync('onClick', {
    path: tmpPath,
  })
  if (!result.isFile) {
    setLastPath(tmpPath + '/')
    setNowPath(tmpPath + '/')
  }
  setFolderList(() => {
    return result.folderList
  })
}
export default handleClick
