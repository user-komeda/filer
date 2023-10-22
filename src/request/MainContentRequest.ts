import React from 'react'
import FileInfo from '../@types/fileInfo'
import StateList from '../@types/stateList'
import StateListFunctions from '../@types/stateListFunctions'
import handleClick from '../event/handleClick'
import sort from '../event/sort'

/**
 *
 * @param stateList
 * @param exportFunctions
 */
const MainContentRequest = (
  stateList: StateList,
  exportFunctions: StateListFunctions
): MainContentRequest => {
  return {
    folderList: stateList.folderList,
    handleClick: (event: React.MouseEvent) => {
      return handleClick(event, stateList, exportFunctions)
    },
    sortFunction: (event: React.MouseEvent) => {
      return sort(event, stateList, exportFunctions)
    },
  }
}
export default MainContentRequest

interface MainContentRequest {
  folderList: Array<FileInfo>
  handleClick: (e: React.MouseEvent) => void
  sortFunction: (e: React.MouseEvent) => void
}
