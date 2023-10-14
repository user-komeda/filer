import FileInfo from '../@types/fileInfo'

/**
 *絞り込み機能
 *
 * @param event -event
 *
 * @param folderList -folderList
 *
 * @param setFilteredFolderList -setFilteredFolderList
 */
const handleBlurFilter = (
  event: React.ChangeEvent<HTMLInputElement>,
  folderList: Array<FileInfo>,
  setFilteredFolderList: React.Dispatch<
    React.SetStateAction<Array<FileInfo> | null>
  >
) => {
  const filterText = event.currentTarget.value
  if (filterText === '') {
    setFilteredFolderList(null)
    return
  }
  const filteredFolderList = folderList.filter((folder) => {
    if (folder.fileName !== undefined) {
      return folder.fileName.includes(filterText)
    }
  })
  setFilteredFolderList(filteredFolderList)
}
export default handleBlurFilter
