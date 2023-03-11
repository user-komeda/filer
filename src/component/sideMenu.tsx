/* eslint-disable jsdoc/no-undefined-types */
import React, { useRef } from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import FileInfo from '../@types/fileInfo'

/**
 *
 * @param props props
 * @returns {JSX.Element} jsx
 */
const SideMenu: React.FC<{
  folderList: Map<string, Map<string, Map<number, Array<FileInfo>>>>
  volumeLabelList: Array<string>
  clickedFolder: Array<string>
  colCountList: Array<string>
  handleClick: (e: React.MouseEvent) => void
}> = (props): JSX.Element => {
  const basePath = 'c://Users/user/'
  const loopCount = useRef(0)
  loopCount.current = 0
  let number = 0
  const clickFolder = props.clickedFolder.slice(1)
  const colCountList = props.colCountList.slice(1)
  const mapFolderList =
    props.folderList ?? new Map<string, Map<number, Array<FileInfo>>>()
  const folderList =
    mapFolderList.get('firstKey')?.get('0')?.get(0) ?? new Array<FileInfo>()
  const volumeLabelList = props.volumeLabelList
  const handleClick = props.handleClick
  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        {folderList.map((folder, index) => {
          number = props.clickedFolder.findIndex((x) => x === folder.fileName)
          return (
            <ListItem
              sx={{
                display: 'block',
              }}
              key={index}
            >
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon onClick={handleClick}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </ListItemIcon>
                <ListItemText
                  primary={folder.fileName}
                  onClick={handleClick}
                ></ListItemText>
                <span
                  style={{ display: 'none' }}
                  data-path={basePath + folder.fileName}
                  data-row={0}
                  data-col={index}
                ></span>
              </ListItemButton>
              {number !== -1
                ? createColList(
                    mapFolderList.get(folder.fileName ?? '') ??
                      new Map<string, Map<number, Array<FileInfo>>>(),
                    folder.fileName ?? '',
                    props.clickedFolder,
                    loopCount,
                    props.colCountList,
                    clickFolder,
                    colCountList,
                    handleClick
                  )
                : ''}
            </ListItem>
          )
        })}
        {volumeLabelList.map((volumeLabel, index) => {
          return (
            <ListItem key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </ListItemIcon>
                <ListItemText
                  primary={volumeLabel}
                  onClick={handleClick}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

const createColList = (
  mapFolderList: Map<string, Map<number, Array<FileInfo>>>,
  folder: string,
  clickedFolder: Array<string>,
  loopCount: React.MutableRefObject<number>,
  colCountList: Array<string>,
  slicedClickedFolder: Array<string>,
  slicedColCountList: Array<string>,
  handleClick: React.MouseEventHandler
) => {
  console.log(colCountList)
  const colCount = colCountList[loopCount.current]
  const oldColCount = colCountList[loopCount.current - 1]
  const tmpFileNameList =
    mapFolderList.get(colCount) ?? new Map<number, Array<FileInfo>>()
  const oldTmpFileNameList =
    mapFolderList.get(oldColCount) ?? new Map<number, Array<FileInfo>>()
  const keyList = Array.from(tmpFileNameList.keys())
  const oldKey = Array.from(oldTmpFileNameList.keys())[0]
  const fileNameList = tmpFileNameList?.get(keyList[0])
  const oldFileNameList =
    oldTmpFileNameList.get(oldKey) ?? new Array<FileInfo>()
  // console.log(colCountList)
  // console.log(clickedFolder)
  // console.log(fileNameList)
  // console.log(colCount)
  console.log(oldFileNameList)
  // console.log(clickedFolder[clickedFolder.length - 1])
  // console.log(mapFolderList)
  // console.log(fileNameList)
  // console.log(keyList)
  // console.log(tmpFileNameList)
  loopCount.current += 1

  return (
    <List component="nav" disablePadding>
      {fileNameList?.map((fileName, index) => {
        // document,kindleContent,mygame
        // console.log(fileName)

        return (
          <div key={index}>
            <ListItem
              sx={{
                display: 'block',
              }}
              key={index}
            >
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon onClick={handleClick}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </ListItemIcon>
                <ListItemText
                  primary={fileName.fileName}
                  onClick={handleClick}
                ></ListItemText>
                <span
                  style={{ display: 'none' }}
                  data-path={fileName.filePath + '/' + fileName.fileName}
                  data-row={loopCount.current}
                  data-col={index}
                  data-parent-folder={folder}
                ></span>
              </ListItemButton>
              {clickedFolder.includes(fileName.fileName ?? '')
                ? createColList(
                    mapFolderList ?? new Map(),
                    folder,
                    clickedFolder,
                    loopCount,
                    colCountList,
                    slicedClickedFolder,
                    slicedColCountList,
                    handleClick
                  )
                : ''}
            </ListItem>
          </div>
        )
      })}
    </List>
  )
}

// const createRowList = (
//   mapFolderList: Map<number, Array<FileInfo>>,
//   folder: string,
//   clickedFolder: Array<string>,
//   loopCount: number,
//   handleClick: React.MouseEventHandler
// ) => {
//   console.log(mapFolderList)
//   const fileNameList = mapFolderList.get(loopCount)
//   console.log('insert')
//   console.log(fileNameList)
//   return (
//     <List component='nav' disablePadding>
//       {fileNameList?.map((fileName, index) => {
//         return (
//           <ListItem
//             sx={{
//               display: 'block',
//             }}
//             key={index}
//           >
//             <ListItemButton sx={{ pl: 1 }}>
//               <ListItemIcon onClick={handleClick}>
//                 <ArrowForwardIosIcon></ArrowForwardIosIcon>
//               </ListItemIcon>
//               <ListItemText
//                 primary={fileName.fileName}
//                 onClick={handleClick}
//               ></ListItemText>
//               <span
//                 style={{ display: 'none' }}
//                 data-path={fileName.filePath + '/' + fileName.fileName}
//                 data-row={loopCount}
//                 data-col={index}
//                 data-parent-folder={folder}
//               ></span>
//             </ListItemButton>
//             {/*
//             {fileName.fileName === clickedFolder[clickedFolder.length - 1]
//               ? createRowList(
//                   mapFolderList,
//                   folder,
//                   clickedFolder,
//                   loopCount + 1,
//                   handleClick
//                 )
//               : ''} */}
//           </ListItem>
//         )
//       })}
//     </List>
//   )
// }

export default SideMenu
