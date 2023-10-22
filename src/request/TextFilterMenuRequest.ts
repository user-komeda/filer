import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import handleBlurFilter from '../event/handleBlurFilter'

/**
 *
 * @param stateList
 * @param exportFunctions
 */
const TextFilterMenuRequest = (
  stateList: StateList,
  exportFunctions: StateListFunctions
): TextFilterMenuRequest => {
  return {
    handleBlurFilter: (event: React.ChangeEvent<HTMLInputElement>) => {
      return handleBlurFilter(event, stateList, exportFunctions)
    },
  }
}
export default TextFilterMenuRequest

interface TextFilterMenuRequest {
  handleBlurFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
}
