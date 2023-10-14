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
 *sideMenu表示コンポーネント
 *
 * @param props - props
 *
 * @returns jsx
 */
const SideMenu: React.FC<{
  folderList: Map<string, Map<string, Map<number, Array<FileInfo>>>>
  volumeLabelList: Array<string>
  clickedFolder: Array<string>
  colCountList: Array<string>
  handleSideMenuSvgClick: (e: React.MouseEvent) => void
  handleSideMenuClick: (e: React.MouseEvent) => void
}> = (props): JSX.Element => {
  console.log(props.folderList)
  const basePath = 'c://Users/user/'
  const loopCount = useRef(0)
  loopCount.current = 0
  const mapFolderList =
    props.folderList ?? new Map<string, Map<number, Array<FileInfo>>>()
  const folderList =
    mapFolderList.get('firstKey')?.get('0')?.get(0) ?? new Array<FileInfo>()
  const volumeLabelList = props.volumeLabelList
  const handleSideMenuSvgClick = props.handleSideMenuSvgClick
  const handleSideMenuClick = props.handleSideMenuClick
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
          const isExist = props.clickedFolder.find((x) => x === folder.fileName)
          return (
            <ListItem
              sx={{
                display: 'block',
              }}
              key={index}
            >
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon onClick={handleSideMenuSvgClick}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </ListItemIcon>
                <ListItemText
                  primary={folder.fileName}
                  onClick={handleSideMenuClick}
                ></ListItemText>
                <span
                  style={{ display: 'none' }}
                  data-path={basePath + folder.fileName}
                  data-row={0}
                  data-col={index}
                ></span>
              </ListItemButton>
              {isExist
                ? createColList(
                    mapFolderList.get(folder.fileName ?? '') ??
                      new Map<string, Map<number, Array<FileInfo>>>(),
                    folder.fileName ?? '',
                    props.clickedFolder,
                    loopCount,
                    props.colCountList,
                    handleSideMenuSvgClick,
                    handleSideMenuClick
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
                  onClick={handleSideMenuClick}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

/**
 *folderListの描画
 *
 * @param folderList -folderList
 *
 * @param parentFolderName -最上位のフォルダーネーム
 *
 * @param clickedFolderList -clickFolderList
 *
 * @param loopCount -loopCOunt
 *
 * @param colCountList -colCountList
 *
 * @param handleSideMenuSvgClick -svgClickEvent
 *
 * @param handleSideMenuClick -sideMenuClickEvent
 *
 * @returns jsx
 */
const createColList = (
  folderList: Map<string, Map<number, Array<FileInfo>>>,
  parentFolderName: string,
  clickedFolderList: Array<string>,
  loopCount: React.MutableRefObject<number>,
  colCountList: Array<string>,
  handleSideMenuSvgClick: React.MouseEventHandler,
  handleSideMenuClick: React.MouseEventHandler
) => {
  const colCount = colCountList[loopCount.current]
  const tmpFileNameList =
    folderList.get(colCount) ?? new Map<number, Array<FileInfo>>()
  const keyList = Array.from(tmpFileNameList.keys())
  const fileNameList = tmpFileNameList?.get(keyList[0])
  loopCount.current += 1
  return (
    <List component="nav" disablePadding>
      {fileNameList?.map((fileName, index) => {
        return (
          <div key={index}>
            <ListItem
              sx={{
                display: 'block',
              }}
              key={index}
            >
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon onClick={handleSideMenuSvgClick}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </ListItemIcon>
                <ListItemText
                  primary={fileName.fileName}
                  onClick={handleSideMenuClick}
                ></ListItemText>
                <span
                  style={{ display: 'none' }}
                  data-path={fileName.filePath + '/' + fileName.fileName}
                  data-row={loopCount.current}
                  data-col={index}
                  data-parent-folder={parentFolderName}
                ></span>
              </ListItemButton>
              {clickedFolderList.includes(fileName.fileName ?? '')
                ? createColList(
                    folderList ?? new Map(),
                    parentFolderName,
                    clickedFolderList,
                    loopCount,
                    colCountList,
                    handleSideMenuSvgClick,
                    handleSideMenuClick
                  )
                : ''}
            </ListItem>
          </div>
        )
      })}
    </List>
  )
}

export default SideMenu
