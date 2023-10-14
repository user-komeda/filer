/**
 * changeEvent処理
 *
 * @param event -event
 *
 * @param setLastPath -setLastPath
 *
 * @param setNowPath -setNowPath
 */
const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setLastPath: React.Dispatch<React.SetStateAction<string>>,
  setNowPath: React.Dispatch<React.SetStateAction<string>>
) => {
  const path = event.currentTarget.value
  setNowPath(path)
  setLastPath(path)
}
export default handleChange
