import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import handleBlurFilter from '../event/handleBlurFilter'

/**
 *TextFilterMenuComponent 引数
 *
 * @param stateList -stateList
 *
 * @param exportFunctions -exportFunctions
 *
 * @returns  TextFilterMenuRequest
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
