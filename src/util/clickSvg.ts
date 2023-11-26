// import FileInfo from '../@types/fileInfo'

import EventValue from '../@types/eventValue'
import RefList from '../@types/refList'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import setInitValue from './setInitValue'

/**
 *clickSvg
 *
 * @param stateList -stateList
 *
 * @param refList -refList
 *
 * @param eventValue -eventValue
 *
 * @param exportFunctions -exportFunctions
 */
const clickSvg = (
  stateList: StateList,
  refList: RefList,
  eventValue: EventValue,
  exportFunctions: StateListFunctions
) => {
  if (
    eventValue.clickedContentValue ===
      stateList.clickedFolderList[stateList.clickedFolderList.length - 1] ||
    eventValue.firstFolderFlag
  ) {
    if (refList.sameFolderDeletedFlag.current === true) {
      setInitValue(stateList, refList, eventValue, exportFunctions)
      refList.sameFolderDeletedFlag.current =
        !refList.sameFolderDeletedFlag.current
      return
    }
    refList.sameFolderDeletedFlag.current =
      !refList.sameFolderDeletedFlag.current
  }
}
export default clickSvg
