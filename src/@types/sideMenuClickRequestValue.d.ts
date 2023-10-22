import StateList from './stateList'
import StateListFunctions from './stateListFunctions'

/**
 * メソッドの引数となりうるstateの一覧
 */
export default interface StateListRequest {
  /**
   * stateList
   */
  stateList: StateList
  /**
   * exportFunctions
   */
  exportFunctions: StateListFunctions
}
