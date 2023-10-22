import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import redoFunction from '../event/redoFunction'
import undoFunction from '../event/undoFunction'

/**
 *PanelMenuComponent引数
 *
 * @param stateList -stateList
 *
 * @param exportFunctions -exportFunctions
 *
 * @returns PanelMenuRequest
 */
const PanelMenuRequest = (
  stateList: StateList,
  exportFunctions: StateListFunctions
): PanelMenuRequest => {
  return {
    undoFunction: () => {
      return undoFunction(stateList, exportFunctions)
    },
    redoFunction: () => {
      return redoFunction(stateList, exportFunctions)
    },
  }
}
export default PanelMenuRequest
interface PanelMenuRequest {
  undoFunction: () => void
  redoFunction: () => void
}
