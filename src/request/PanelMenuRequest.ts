import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import redoFunction from '../event/redoFunction'
import undoFunction from '../event/undoFunction'

/**
 *
 * @param stateList
 * @param exportFunctions
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
