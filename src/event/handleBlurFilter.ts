import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'

/**
 *絞り込み機能
 *
 * @param event -event
 *
 * @param stateList -stateList
 *
 * @param exportFunctions -exportFunctions
 */
const handleBlurFilter = (
  event: React.ChangeEvent<HTMLInputElement>,
  stateList: StateList,
  exportFunctions: StateListFunctions
) => {
  const filterText = event.currentTarget.value
  if (filterText === '') {
    exportFunctions.setFilteredFolderList([])
    return
  }
  const filteredFolderList = stateList.folderList.filter((folder) => {
    if (folder.fileName !== undefined) {
      return folder.fileName.includes(filterText)
    }
  })
  exportFunctions.setFilteredFolderList(filteredFolderList)
}
export default handleBlurFilter
