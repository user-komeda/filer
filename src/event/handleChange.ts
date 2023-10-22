import StateListFunctions from '../@types/stateListFunctions'

/**
 * changeEvent処理
 *
 * @param event -event
 *
 * @param exportFunctions -exportFunctions
 */
const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  exportFunctions: StateListFunctions
) => {
  const path = event.currentTarget.value
  exportFunctions.setNowPath(path)
  exportFunctions.setLastPath(path)
}
export default handleChange
