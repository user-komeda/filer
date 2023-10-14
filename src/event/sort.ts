import FileInfo from '../@types/fileInfo'

/**
 *sort処理
 *
 * @param event -event
 *
 * @param folderList -folderList
 *
 * @param isSortTypeAsc -isSortTypeAsc
 *
 * @param setSortType -setSortType
 */
const sort = (
  event: React.MouseEvent,
  folderList: Array<FileInfo>,
  isSortTypeAsc: boolean,
  setSortType: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const sortTarget = event.currentTarget.id
  switch (sortTarget) {
    case 'fileName':
      sortByName(folderList, isSortTypeAsc)
      break
    case 'fileUpdateTime':
      sortByUpdateTime(folderList, isSortTypeAsc)
      break
    case 'fileType':
      sortByFileType(folderList, isSortTypeAsc)
      break
    case 'fileSize':
      sortByFileSize(folderList, isSortTypeAsc)
      break
  }
  setSortType(!isSortTypeAsc)
}

/**
 *folderListを名前でソート
 *
 * @param folderList -folderList
 *
 * @param isSortTypeAsc -isSortTypeAsc
 */
const sortByName = (folderList: Array<FileInfo>, isSortTypeAsc: boolean) => {
  folderList.sort((a, b) => {
    if (a.fileName === undefined || b.fileName === undefined) {
      return 0
    }
    if (isSortTypeAsc) {
      return a.fileName.toUpperCase() < b.fileName.toUpperCase() ? -1 : 1
    } else {
      return a.fileName.toUpperCase() > b.fileName.toUpperCase() ? -1 : 1
    }
  })
}

/**
 *folderListをサイズでソート
 *
 * @param folderList -folderList
 *
 * @param isSortTypeAsc -isSortTypeAsc
 */
const sortByFileSize = (
  folderList: Array<FileInfo>,
  isSortTypeAsc: boolean
) => {
  folderList.sort((a, b) => {
    if (a.fileSize === undefined || b.fileSize === undefined) {
      return 0
    }
    if (isSortTypeAsc) {
      return a.fileSize - b.fileSize
    } else {
      return b.fileSize - a.fileSize
    }
  })
}

/**
 *folderListを種類でソート
 *
 * @param folderList -folderList
 *
 * @param isSortTypeAsc -isSortTypeAsc
 */
const sortByFileType = (
  folderList: Array<FileInfo>,
  isSortTypeAsc: boolean
) => {
  folderList.sort((a, b) => {
    if (a.fileType === undefined || b.fileType === undefined) {
      return 0
    }
    if (isSortTypeAsc) {
      return a.fileType < b.fileType ? -1 : 1
    } else {
      return a.fileType > b.fileType ? -1 : 1
    }
  })
}

/**
 *folderListを更新時間でソート
 *
 * @param folderList -folderList
 *
 * @param isSortTypeAsc -isSortTypeAsc
 */
const sortByUpdateTime = (
  folderList: Array<FileInfo>,
  isSortTypeAsc: boolean
) => {
  folderList.sort((a, b) => {
    if (a.updateFileTime === undefined || b.updateFileTime === undefined) {
      return 0
    }
    if (isSortTypeAsc) {
      return a.updateFileTime < b.updateFileTime ? -1 : 1
    } else {
      return a.updateFileTime > b.updateFileTime ? -1 : 1
    }
  })
}

export default sort
