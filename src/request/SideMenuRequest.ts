import FileInfo from '../@types/fileInfo'
import RefList from '../@types/refList'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import handleSideMenuClick from '../event/handleSideMenuClick'
import handleSideMenuSvgClick from '../event/handleSideMenuSvgClick'

/**
 *SideMenuComponent引数
 *
 * @param stateList -stateList
 *
 * @param refList -refList
 *
 * @param exportFunctions -exportFunctions
 *
 * @returns SideMenuRequest
 */
const SideMenuRequest = (
  stateList: StateList,
  refList: RefList,
  exportFunctions: StateListFunctions
): SideMenuRequest => {
  return {
    folderList: stateList.sideMenuFolderList,
    volumeLabelList: stateList.volumeLabelList,
    clickFolderList: stateList.clickedFolderList,
    colCountList: stateList.colCountList,
    handleSideMenuClick: (event) => {
      return handleSideMenuClick(event, exportFunctions)
    },
    handleSideMenuSvgClick: (event) => {
      return handleSideMenuSvgClick(event, stateList, refList, exportFunctions)
    },
  }
}
export default SideMenuRequest
interface SideMenuRequest {
  folderList: Map<string, Map<string, Map<number, FileInfo[]>>>
  volumeLabelList: Array<string>
  clickFolderList: Array<string>
  colCountList: Array<string>
  handleSideMenuSvgClick: (event: React.MouseEvent) => void
  handleSideMenuClick: (event: React.MouseEvent) => void
}
