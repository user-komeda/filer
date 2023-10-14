import { ipcRenderer } from 'electron'
import FileInfo from '../@types/fileInfo'

/**
 *blurEvent処理
 *
 * @param event -event
 *
 * @param setLastPath -setLastPath
 *
 * @param setNowPath -setNowPath
 *
 * @param setFolderList -setFolderList
 */
const handleBlur = (
  event: React.ChangeEvent<HTMLInputElement>,
  setLastPath: React.Dispatch<React.SetStateAction<string>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>,
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>
) => {
  const path = event.currentTarget.value
  const pathArray = path.split('/')
  pathArray.length = pathArray.length - 1
  const beforePath = pathArray.join('/')
  const result = ipcRenderer.sendSync('onChange', {
    path: path,
  })
  if (!result.flag) {
    setNowPath(beforePath + '/')
    setLastPath(beforePath + '/')
  } else {
    setNowPath(path + '/')
    setLastPath(path + '/')
    setFolderList(result.folderList)
  }
}
export default handleBlur
