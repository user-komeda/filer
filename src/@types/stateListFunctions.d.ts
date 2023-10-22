import FileInfo from './fileInfo'

/**
 *
 */
export default interface StateListFunctions {
  /**
   *
   */
  setLastPath: (value: string) => void
  /**
   *
   */
  setNowPath: (value: string) => void
  /**
   *
   */
  setFolderList: (value: Array<FileInfo>) => void
  /**
   *
   */
  setSideMenuFolderList: (
    value: Map<string, Map<string, Map<number, FileInfo[]>>>
  ) => void

  /**
   *
   */
  setFilteredFolderList: (value: Array<FileInfo>) => void
  /**
   *
   */
  setFlag: (value: boolean) => void
  /**
   *
   */
  setProgramNameList: (value: Array<string>) => void
  /**
   *
   */
  setIconList: (value: Array<string>) => void
  /**
   *
   */
  setIsSortTypeAsc: (value: boolean) => void
  /**
   *
   */
  setVolumeLabelList: (value: Array<string>) => void
  /**
   *
   */
  setClickedFolderList: (value: Array<string>) => void
  /**
   *
   */
  setColCountList: (value: Array<string>) => void
  /**
   *
   */
  setRowCountList: (value: Array<string>) => void
}
