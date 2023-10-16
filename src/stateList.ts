import { useRef, useState } from 'react'
import FileInfo from './@types/fileInfo'
import StateList from './@types/stateList'

const STATE_LIST: StateList = {
  lastPath: '',
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
 *
 */
export /**
eeeeeee *
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee */
const initStateList = () => {
  /**
   *
   */
  const [stateList, setStateList] = useState(STATE_LIST)
  return stateList
}

/**
 *
 */
export /**
eeeeeee *
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee */
const initRefList = () => {
  /**
   *
   */
  const REF_LIST = {
    row: useRef(-1),
    sideMenuFolderPath: useRef(''),
    sameFolderDeletedFlag: useRef(true),
  }
  return REF_LIST
}
