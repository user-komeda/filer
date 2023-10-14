import { ipcRenderer } from 'electron'
import FileInfo from '../@types/fileInfo'

/**
 *やり直し処理処理
 *
 * @param nowPath -nowPath
 *
 * @param lastPath -lastPath
 *
 * @param setFolderList -setFolderList
 *
 * @param setNowPath -setNowPath
 */
const redoFunction = (
  nowPath: string,
  lastPath: string,
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>
) => {
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
    setFolderList(() => {
      return result.folderList
    })
    setNowPath(a + '/')
  }
}
export default redoFunction
