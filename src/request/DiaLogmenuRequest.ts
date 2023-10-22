import StateList from '../@types/stateList'

/**
 *
 * @param stateList
 */
const DiaLogMenuRequest = (stateList: StateList): DiaLogMenuRequest => {
  return {
    programNameList: stateList.programNameList,
    nowPath: stateList.nowPath,
    iconList: stateList.iconList,
  }
}
export default DiaLogMenuRequest
interface DiaLogMenuRequest {
  programNameList: Array<string>
  nowPath: string
  iconList: Array<string>
}
