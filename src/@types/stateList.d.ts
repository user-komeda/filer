import FileInfo from './fileInfo'

/**
 *StateList
 */
export default interface StateList {
  /**
   *lastPath
   */
  lastPath: string
  /**
   *nowPath
   */
  nowPath: string
  /**
   *folderList
   */
  folderList: Array<FileInfo>
  /**
   *sideMenuFolderList
   */
  sideMenuFolderList: Map<string, Map<string, Map<number, Array<FileInfo>>>>
  /**
   *filteredFolderList
   */
  filteredFolderList: Array<FileInfo>
  /**
   *flag
   */
  flag: boolean
  /**
   *programNameList
   */
  programNameList: Array<string>
  /**
   *iconList
   */
  iconList: Array<string>
  /**
   *isSortTypeAsc
   */
  isSortTypeAsc: boolean
  /**
   *volumeLabelList
   */
  volumeLabelList: Array<string>
  /**
   *clickedFolderList
   */
  clickedFolderList: Array<string>
  /**
   *colCountList
   */
  colCountList: Array<string>
  /**
   *rowCountList
   */
  rowCountList: Array<string>
}
