import React from 'react'
import FileInfo from './fileInfo'

export default interface RequestValue {
  sideMenuFolderList: Map<string, Map<string, Map<number, Array<FileInfo>>>>
  clickedFolder: Array<string>
  sameFolderDeletedFlag: React.MutableRefObject<boolean>
  row: React.MutableRefObject<number>
  sideMenuFolderPath: React.MutableRefObject<string>
  colCountList: Array<string>
  rowCountList: Array<number>
  setLastPath: React.Dispatch<React.SetStateAction<string>>
  setNowPath: React.Dispatch<React.SetStateAction<string>>
  setSideMenuFolderList: React.Dispatch<
    React.SetStateAction<Map<string, Map<string, Map<number, Array<FileInfo>>>>>
  >
  setClickedFolder: React.Dispatch<React.SetStateAction<Array<string>>>
  setColCountList: React.Dispatch<React.SetStateAction<Array<string>>>
  setRowCountList: React.Dispatch<React.SetStateAction<Array<number>>>
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>
}
