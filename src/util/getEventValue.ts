import EventValue from '../@types/eventValue'
import StateList from '../@types/stateList'

/**
 *eventオブジェクトを使用し値を取得
 *
 * @param event -event
 *
 * @param stateList -stateList
 *
 * @returns EventValue
 */
const getEventValue = (
  event: React.MouseEvent,
  stateList: StateList
): EventValue => {
  const targetValue = event.currentTarget.textContent ?? ''
  const targetChildValue =
    event.currentTarget.nextElementSibling?.children[0].textContent ?? ''
  const clickedContentValue =
    targetValue === '' ? targetChildValue : targetValue
  const rowCount =
    Number(
      event.currentTarget.parentNode?.children[2].getAttribute('data-row')
    ) ?? 0
  const colCount =
    event.currentTarget.parentNode?.children[2].getAttribute('data-col') +
    '' +
    '_' +
    rowCount

  const folderParentName =
    event.currentTarget.parentNode?.children[2].getAttribute(
      'data-parent-folder'
    ) ?? clickedContentValue

  const path =
    event.currentTarget.parentNode?.children[2].getAttribute('data-path') ?? ''

  const firstFolderList =
    stateList.sideMenuFolderList.get('firstKey')?.get('0')?.get(0) ?? []

  const firstFolderFlag = firstFolderList.some((folder) => {
    folder.fileName === clickedContentValue &&
      clickedContentValue === folderParentName
  })

  return {
    rowCount,
    colCount,
    path,
    targetValue,
    targetChildValue,
    clickedContentValue,
    folderParentName,
    firstFolderFlag,
  }
}
export default getEventValue
