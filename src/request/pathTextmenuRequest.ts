import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import handleBlur from '../event/handleBlur'
import handleChange from '../event/handleChange'

/**
 *PathTextMenuComponent引数
 *
 * @param stateList -stateList
 *
 * @param exportFunctions -exportFunctions
 *
 * @returns PathTextMenuRequest
 */
const PathTextMenuRequest = (
  stateList: StateList,
  exportFunctions: StateListFunctions
): PathTextMenuRequest => {
  return {
    path: stateList.nowPath ? stateList.nowPath : stateList.lastPath,
    handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
      return handleBlur(event, exportFunctions)
    },
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      return handleChange(event, exportFunctions)
    },
  }
}
export default PathTextMenuRequest
interface PathTextMenuRequest {
  path: string
  handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
