import FileInfo from './fileInfo'

/**
 *
 */
export default interface StateList {
  /**
   *
   */
  lastPath: string
  /**
   *
   */
  nowPath: string
  /**
   *
   */
  folderList: Array<FileInfo>
  /**
   *
   */
  sideMenuFolderList: Map<string, Map<string, Map<number, Array<FileInfo>>>>
  /**
   *
   */
  filteredFolderList: Array<FileInfo>
  /**
   *
   */
  flag: boolean
  /**
   *
   */
  programNameList: Array<string>
  /**
   *
   */
  iconList: Array<string>
  /**
   *
   */
  isSortTypeAsc: boolean
  /**
   *
   */
  volumeLabelList: Array<string>
  /**
   *
   */
  clickedFolderList: Array<string>
  /**
   *
   */
  colCountList: Array<string>
  /**
   *
   */
  rowCountList: Array<string>
}
