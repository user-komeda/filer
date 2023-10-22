import FileInfo from './fileInfo'

/**
 *StateListFunctions
 */
export default interface StateListFunctions {
  /**
   *setLastPath
   */
  setLastPath: (value: string) => void
  /**
   *setNowPath
   */
  setNowPath: (value: string) => void
  /**
   *setFolderList
   */
  setFolderList: (value: Array<FileInfo>) => void
  /**
   *setSideMenuFolderList
   */
  setSideMenuFolderList: (
    value: Map<string, Map<string, Map<number, FileInfo[]>>>
  ) => void

  /**
   *setFilteredFolderList
   */
  setFilteredFolderList: (value: Array<FileInfo>) => void
  /**
   *setFlag
   */
  setFlag: (value: boolean) => void
  /**
   *setProgramNameList
   */
  setProgramNameList: (value: Array<string>) => void
  /**
   *setIconList
   */
  setIconList: (value: Array<string>) => void
  /**
   *setIsSortTypeAsc
   */
  setIsSortTypeAsc: (value: boolean) => void
  /**
   *setVolumeLabelList
   */
  setVolumeLabelList: (value: Array<string>) => void
  /**
   *setClickedFolderList
   */
  setClickedFolderList: (value: Array<string>) => void
  /**
   *setColCountList
   */
  setColCountList: (value: Array<string>) => void
  /**
   *setRowCountList
   */
  setRowCountList: (value: Array<string>) => void
}
