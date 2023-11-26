import { useRef, useState } from 'react'
import FileInfo from '../@types/fileInfo'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import RefList from '../@types/refList'
import { basePath } from '../const/const'

const STATE_LIST: StateList = {
  lastPath: basePath,
  nowPath: '',
  folderList: [],
  sideMenuFolderList: new Map(),
  filteredFolderList: [],
  flag: false,
  programNameList: [],
  iconList: [],
  isSortTypeAsc: true,
  volumeLabelList: [],
  clickedFolderList: [],
  colCountList: [],
  rowCountList: [],
}

/**
 *stateList
 *
 * @returns [StateList, StateListFunctions]
 */
export const useInitStateList = (): [StateList, StateListFunctions] => {
  /**
   *stateList
   */
  const [stateList, setStateList] = useState(STATE_LIST)

  const setLastPath = (value: string) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.lastPath = value
      return updateValue
    })
  }

  const setNowPath = (value: string) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.nowPath = value
      return updateValue
    })
  }

  const setFolderList = (value: Array<FileInfo>) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.folderList = value
      return updateValue
    })
  }

  const setSideMenuFolderList = (
    value: Map<string, Map<string, Map<number, FileInfo[]>>>
  ) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.sideMenuFolderList = value
      return updateValue
    })
  }

  const setFilteredFolderList = (value: Array<FileInfo>) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.filteredFolderList = value
      return updateValue
    })
  }

  const setFlag = (value: boolean) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.flag = value
      return updateValue
    })
  }

  const setProgramNameList = (value: Array<string>) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.programNameList = value
      return updateValue
    })
  }

  const setIconList = (value: Array<string>) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.iconList = value
      return updateValue
    })
  }

  const setIsSortTypeAsc = (value: boolean) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.isSortTypeAsc = value
      return updateValue
    })
  }

  const setVolumeLabelList = (value: Array<string>) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.volumeLabelList = value
      return updateValue
    })
  }

  const setClickedFolderList = (value: Array<string>) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.clickedFolderList = value
      return updateValue
    })
  }

  const setColCountList = (value: Array<string>) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.colCountList = value
      return updateValue
    })
  }

  const setRowCountList = (value: Array<string>) => {
    setStateList((prev: StateList) => {
      const updateValue = Object.assign({}, prev)
      updateValue.rowCountList = value
      return updateValue
    })
  }

  const exportFunctions: StateListFunctions = {
    setLastPath,
    setNowPath,
    setFolderList,
    setSideMenuFolderList,
    setFilteredFolderList,
    setFlag,
    setProgramNameList,
    setIconList,
    setIsSortTypeAsc,
    setVolumeLabelList,
    setClickedFolderList,
    setColCountList,
    setRowCountList,
  }

  return [stateList, exportFunctions]
}

/**
 *initRefList
 *
 *@returns RefList
 */
export const useInitRefList = (): RefList => {
  /**
   *  useRefList
   */
  const useRefList = {
    row: useRef(-1),
    sideMenuFolderPath: useRef(''),
    sameFolderDeletedFlag: useRef(true),
  }

  return useRefList
}
