import { ipcRenderer } from 'electron'
import FileInfo from '../@types/fileInfo'
import StateListRequest from '../@types/sideMenuClickRequestValue'
import { basePath } from '../const/const'

/**
 *svgクリック処理
 *
 * @param event -event
 *
 * @param requestValue -requestValue
 */
const handleSideMenuSvgClick = (
  event: React.MouseEvent,
  requestValue: StateListRequest
) => {
  const targetTagName = event.currentTarget.children[0].tagName
  const targetValue = event.currentTarget.textContent ?? ''
  const targetChildValue =
    event.currentTarget.nextElementSibling?.children[0].textContent ?? ''
  const clickedContentValue =
    targetValue === '' ? targetChildValue : targetValue
  const firstFolderList =
    requestValue.sideMenuFolderList.get('firstKey')?.get('0')?.get(0) ?? []
  const filePath =
    event.currentTarget.parentNode?.children[2].getAttribute('data-path') ?? ''
  const rowCount =
    Number(
      event.currentTarget.parentNode?.children[2].getAttribute('data-row')
    ) ?? 0
  requestValue.setRowCountList(requestValue.rowCountList.concat(rowCount))
  const colCount =
    event.currentTarget.parentNode?.children[2].getAttribute('data-col') +
    '' +
    '_' +
    rowCount

  const folderParentName =
    event.currentTarget.parentNode?.children[2].getAttribute(
      'data-parent-folder'
    ) ?? clickedContentValue
  const splitFilePath = filePath.split('/')

  const splitFilePathLength = splitFilePath.length

  const path =
    event.currentTarget.parentNode?.children[2].getAttribute('data-path') ?? ''

  const firstFolderFlag = firstFolderList.some((folder) => {
    folder.fileName === clickedContentValue &&
      clickedContentValue === folderParentName
  })
  if (
    clickedContentValue ===
      requestValue.clickedFolderList[
        requestValue.clickedFolderList.length - 1
      ] ||
    firstFolderFlag
  ) {
    if (requestValue.sameFolderDeletedFlag.current === true) {
      setInitValue(
        path,
        rowCount,
        deleteWhenCClickedFolderIsSame(
          folderParentName ?? '',
          requestValue.sideMenuFolderList
        ),
        requestValue.row,
        requestValue.sideMenuFolderPath,
        requestValue.setSideMenuFolderList
      )
      requestValue.sameFolderDeletedFlag.current =
        !requestValue.sameFolderDeletedFlag.current
      return
    }
    requestValue.sameFolderDeletedFlag.current =
      !requestValue.sameFolderDeletedFlag.current
  }

  // フォルダList検索
  const result = ipcRenderer.sendSync('onClick', {
    path: path,
  })

  if (result.folderList === null || result.isFile) {
    return
  }

  requestValue.setColCountList(requestValue.colCountList.concat(colCount ?? ''))
  requestValue.setClickedFolderList(() => {
    return requestValue.clickedFolderList.concat(clickedContentValue)
  })
  if (targetTagName === 'svg') {
    // TODO ここから下の分岐の見直し
    const sideMenuPath = requestValue.sideMenuFolderPath.current
    if (sideMenuPath !== '') {
      const splitSideMenuPath = sideMenuPath.split('/')
      if (splitSideMenuPath[splitSideMenuPath.length - 1] === '') {
        splitSideMenuPath.pop()
      }
      const count = splitSideMenuPath.length + 1 - splitFilePathLength
      if (count > 1) {
        // for (let i = 0; i < count; i++) {
        //   requestValue.sideMenuFolderList
        //     .get(folderParentName ?? clickedContentValue)
        //     ?.delete(mapSize - 1)
        // }
        // requestValue.setSideMenuFolderList(() => {
        //   return new Map<string, Map<number, Array<FileInfo>>>(
        //     requestValue.sideMenuFolderList
        //   )
        // })
        const updateMap = new Map<
          string,
          Map<string, Map<number, Array<FileInfo>>>
        >(requestValue.sideMenuFolderList)
        const tmpMap = new Map<string, Map<number, Array<FileInfo>>>()
        const map = new Map<number, Array<FileInfo>>([
          [rowCount + 1, result.folderList],
        ])
        tmpMap.set(colCount ?? '', map)
        updateMap.set(folderParentName ?? clickedContentValue, tmpMap)
        requestValue.setSideMenuFolderList(() => {
          return new Map<string, Map<string, Map<number, Array<FileInfo>>>>(
            updateMap
          )
        })
        return
      } else {
        const updateMap = new Map<
          string,
          Map<string, Map<number, Array<FileInfo>>>
        >(requestValue.sideMenuFolderList)

        if (requestValue.row.current === rowCount) {
          // if (menuFolderList.has(rowCount + 1)) {
          //   updateMap
          //     .get(folderParentName ?? clickedContentValue)
          //     ?.delete(rowCount + 1)
          // }

          const tmpMap = updateMap.get(folderParentName ?? clickedContentValue)

          if (tmpMap) {
            const map = new Map<number, Array<FileInfo>>([
              [rowCount + 1, result.folderList],
            ])
            updateMap
              .get(folderParentName ?? clickedContentValue)
              ?.set(colCount ?? '', map)
          } else {
            const tmpMap = new Map<string, Map<number, Array<FileInfo>>>()
            const map = new Map<number, Array<FileInfo>>([
              [rowCount + 1, result.folderList],
            ])
            tmpMap.set(colCount ?? '', map)
            updateMap.set(folderParentName ?? clickedContentValue, tmpMap)
          }

          requestValue.setSideMenuFolderList(() => {
            return new Map<string, Map<string, Map<number, Array<FileInfo>>>>(
              updateMap
            )
          })
        } else {
          const tmpMap = new Map<number, Array<FileInfo>>([
            [rowCount + 1, result.folderList],
          ])
          updateMap
            .get(folderParentName ?? clickedContentValue)
            ?.set(colCount ?? '', tmpMap)
          requestValue.setSideMenuFolderList(() => {
            return new Map<string, Map<string, Map<number, Array<FileInfo>>>>(
              updateMap
            )
          })
        }
      }
      requestValue.sideMenuFolderPath.current = path
      requestValue.row.current = rowCount
      return
    }
    const updateMap = requestValue.sideMenuFolderList
    const map = new Map<number, Array<FileInfo>>([
      [rowCount + 1, result.folderList],
    ])
    const tmpMap = new Map<string, Map<number, Array<FileInfo>>>([
      [colCount ?? '', map],
    ])
    updateMap.set(folderParentName ?? clickedContentValue, tmpMap)
    requestValue.setSideMenuFolderList(() => {
      return new Map<string, Map<string, Map<number, Array<FileInfo>>>>(
        updateMap
      )
    })
    requestValue.row.current = rowCount
    requestValue.sideMenuFolderPath.current = path
  } else {
    requestValue.setNowPath(`${basePath}${clickedContentValue}`)
    requestValue.setLastPath(`${basePath}${clickedContentValue}`)
  }
}

/**
 *同じファイルをクリックした場合閉じる
 *
 * @param folderParentName -最上位のフォルダ名
 *
 * @param folderList -folderList
 *
 * @returns folderList
 */
const deleteWhenCClickedFolderIsSame = (
  folderParentName: string,
  folderList: Map<string, Map<string, Map<number, Array<FileInfo>>>>
) => {
  const sideMenuFolderList = new Map<
    string,
    Map<string, Map<number, Array<FileInfo>>>
  >(folderList)
  // sideMenuFolderList.get(folderParentName)?.delete(rowCount + 1)
  return sideMenuFolderList
}

/**
 *初期化処理
 *
 * @param path -path
 *
 * @param rowCount -rowCount
 *
 * @param sideMenuFolderList -sideMenuFolderList
 *
 * @param row -row
 *
 * @param sideMenuFolderPath -sideMenuFolderPath
 *
 * @param setSideMenuFolderList -setSideMenuFolderList
 */
const setInitValue = (
  path: string,
  rowCount: number,
  sideMenuFolderList: Map<string, Map<string, Map<number, Array<FileInfo>>>>,
  row: React.MutableRefObject<number>,
  sideMenuFolderPath: React.MutableRefObject<string>,
  setSideMenuFolderList: React.Dispatch<
    React.SetStateAction<Map<string, Map<string, Map<number, Array<FileInfo>>>>>
  >
) => {
  setSideMenuFolderList(() => {
    // const sideMenuFolderList = sideMenuFolderList
    return new Map<string, Map<string, Map<number, Array<FileInfo>>>>(
      sideMenuFolderList
    )
  })
  row.current = rowCount
  sideMenuFolderPath.current = path
}
export default handleSideMenuSvgClick
