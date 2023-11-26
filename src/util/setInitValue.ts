import EventValue from '../@types/eventValue'
import FileInfo from '../@types/fileInfo'
import RefList from '../@types/refList'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'

/**
 *init
 *
 * @param stateList -stateList
 *
 * @param refList - refList
 *
 * @param eventValue -eventValue
 *
 * @param exportFunctions - exportFunctions
 */
const setInitValue = (
  stateList: StateList,
  refList: RefList,
  eventValue: EventValue,
  exportFunctions: StateListFunctions
) => {
  const map = new Map<string, Map<string, Map<number, Array<FileInfo>>>>(
    stateList.sideMenuFolderList
  )
  exportFunctions.setSideMenuFolderList(map)
  refList.row.current = eventValue.rowCount
  refList.sideMenuFolderPath.current = eventValue.path
}
export default setInitValue
