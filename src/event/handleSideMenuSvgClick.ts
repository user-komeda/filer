import { ipcRenderer } from 'electron'
import FileInfo from '../@types/fileInfo'
import { basePath } from '../const/const'
import clickSvg from '../util/clickSvg'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import RefList from '../@types/refList'

/**
 *svgクリック処理
 * @param event -event
 * @param requestValue -requestValue
 * @param stateList
 * @param refList
 * @param exportFunctions
 */
const handleSideMenuSvgClick = (
  event: React.MouseEvent,
  stateList: StateList,
  refList: RefList,
  exportFunctions: StateListFunctions
) => {
  const targetTagName = event.currentTarget.children[0].tagName
  const targetValue = event.currentTarget.textContent ?? ''
  const targetChildValue =
    event.currentTarget.nextElementSibling?.children[0].textContent ?? ''
  const clickedContentValue =
    targetValue === '' ? targetChildValue : targetValue
  const rowCount =
    Number(
      event.currentTarget.parentNode?.children[2].getAttribute('data-row')
    ) ?? 0
  exportFunctions.setRowCountList(
    stateList.rowCountList.concat(rowCount.toString())
  )
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

  clickSvg()
  // フォルダList検索
  const result = ipcRenderer.sendSync('onClick', {
    path: path,
  })

  exportFunctions.setColCountList(stateList.colCountList.concat(colCount ?? ''))
  exportFunctions.setClickedFolderList(
    stateList.clickedFolderList.concat(clickedContentValue)
  )
  if (targetTagName === 'svg') {
    // TODO ここから下の分岐の見直し
    // TODO ここから下の分岐の見直し
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
        [rowCount + 1, result.folderList],
      ])
      updateMap
        .get(folderParentName ?? clickedContentValue)
        ?.set(colCount ?? '', tmpMap)
      exportFunctions.setSideMenuFolderList(new Map(updateMap))
      refList.sideMenuFolderPath.current = path
      refList.row.current = rowCount
      return
    }
    const updateMap = stateList.sideMenuFolderList
    const map = new Map<number, Array<FileInfo>>([
      [rowCount + 1, result.folderList],
    ])
    const tmpMap = new Map<string, Map<number, Array<FileInfo>>>([
      [colCount ?? '', map],
    ])
    updateMap.set(folderParentName ?? clickedContentValue, tmpMap)
    exportFunctions.setSideMenuFolderList(new Map(updateMap))
    refList.row.current = rowCount
    refList.sideMenuFolderPath.current = path
  } else {
    exportFunctions.setNowPath(`${basePath}${clickedContentValue}`)
    exportFunctions.setLastPath(`${basePath}${clickedContentValue}`)
  }
}

export default handleSideMenuSvgClick
