import { ipcRenderer } from 'electron'
import FileInfo from '../@types/fileInfo'

/**
 *戻る処理
 *
 * @param nowPath -nowPath
 *
 * @param lastPath -lastPath
 *
 * @param setFolderList -setFolderList
 *
 * @param setNowPath -setNowPath
 */
const undoFunction = (
  nowPath: string,
  lastPath: string,
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>
) => {
  const tmpPath = nowPath ? nowPath.split('/') : lastPath.split('/')
  tmpPath.unshift()
  tmpPath.length = tmpPath.length - 2
  const path = tmpPath.join('/')
  const result = ipcRenderer.sendSync('onClick', {
    path: path,
  })
  setNowPath(path + '/')

  setFolderList(() => {
    return result.folderList
  })
}
export default undoFunction
