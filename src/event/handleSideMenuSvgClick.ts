import { ipcRenderer } from 'electron'
import FileInfo from '../@types/fileInfo'
import clickSvg from '../util/clickSvg'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import RefList from '../@types/refList'
import getEventValue from '../util/getEventValue'

/**
 *svgクリック処理
 *
 * @param event - event
 *
 * @param stateList - stateList
 *
 * @param refList - refList
 *
 * @param exportFunctions - exportFunctions
 */
const handleSideMenuSvgClick = (
  event: React.MouseEvent,
  stateList: StateList,
  refList: RefList,
  exportFunctions: StateListFunctions
) => {
  const targetTagName = event.currentTarget.children[0].tagName
  if (targetTagName !== 'svg') {
    return
  }
  const eventValue = getEventValue(event, stateList)

  clickSvg(stateList, refList, eventValue, exportFunctions)

  // フォルダList検索
  const result = ipcRenderer.sendSync('onClick', {
    path: eventValue.path,
  })

  exportFunctions.setColCountList(
    stateList.colCountList.concat(eventValue.colCount ?? '')
  )
  exportFunctions.setClickedFolderList(
    stateList.clickedFolderList.concat(eventValue.clickedContentValue)
  )
  exportFunctions.setRowCountList(
    stateList.rowCountList.concat(eventValue.rowCount.toString())
  )
  const sideMenuPath = refList.sideMenuFolderPath.current
  if (sideMenuPath !== '') {
    const splitSideMenuPath = sideMenuPath.split('/')
    if (splitSideMenuPath[splitSideMenuPath.length - 1] === '') {
      splitSideMenuPath.pop()
    }

    const updateMap = new Map<
      string,
      Map<string, Map<number, Array<FileInfo>>>
    >(stateList.sideMenuFolderList)

    const tmpMap = new Map<number, Array<FileInfo>>([
      [eventValue.rowCount + 1, result.folderList],
    ])
    updateMap
      .get(eventValue.folderParentName ?? eventValue.clickedContentValue)
      ?.set(eventValue.colCount ?? '', tmpMap)
    exportFunctions.setSideMenuFolderList(new Map(updateMap))
    refList.sideMenuFolderPath.current = eventValue.path
    refList.row.current = eventValue.rowCount
    return
  }
  const updateMap = stateList.sideMenuFolderList
  const map = new Map<number, Array<FileInfo>>([
    [eventValue.rowCount + 1, result.folderList],
  ])
  const tmpMap = new Map<string, Map<number, Array<FileInfo>>>([
    [eventValue.colCount ?? '', map],
  ])
  updateMap.set(
    eventValue.folderParentName ?? eventValue.clickedContentValue,
    tmpMap
  )
  exportFunctions.setSideMenuFolderList(new Map(updateMap))
  refList.row.current = eventValue.rowCount
  refList.sideMenuFolderPath.current = eventValue.path
}

export default handleSideMenuSvgClick
