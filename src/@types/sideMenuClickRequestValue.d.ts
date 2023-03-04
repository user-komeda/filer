import React from 'react'
import FileInfo from './fileInfo'

export default interface RequestValue {
  sideMenuFolderList: Map<string, Map<number, Map<number, Array<FileInfo>>>>
  clickedFolder: Array<string>
  sameFolderDeletedFlag: React.MutableRefObject<boolean>
  row: React.MutableRefObject<number>
  sideMenuFolderPath: React.MutableRefObject<string>
  colCountList: Array<number>
  setLastPath: React.Dispatch<React.SetStateAction<string>>
  setNowPath: React.Dispatch<React.SetStateAction<string>>
  setSideMenuFolderList: React.Dispatch<
    React.SetStateAction<Map<string, Map<number, Map<number, Array<FileInfo>>>>>
  >
  setClickedFolder: React.Dispatch<React.SetStateAction<Array<string>>>
  setColCountList: React.Dispatch<React.SetStateAction<Array<number>>>
}
