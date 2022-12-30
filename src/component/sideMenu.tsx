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
  folderList: Map<number, Array<FileInfo>>
  volumeLabelList: Array<string>
  clickedFolder: Array<string>
  handleClick: (e: React.MouseEvent) => void
}> = (props) => {
  const basePath = 'c://Users/user/'
  const loopCount = useRef(0)
  const mapFolderList = props.folderList ?? new Map<number, Array<FileInfo>>()
  const folderList = mapFolderList.get(0) ?? new Array<FileInfo>()
  const volumeLabelList = props.volumeLabelList
  const handleClick = props.handleClick
  const lastMap =
    mapFolderList.get(mapFolderList.size - 1) ?? new Array<FileInfo>()

  const filePath =
    lastMap.length === 0 ? '' : lastMap[lastMap.length - 1].filePath ?? ''
  console.dir(mapFolderList)
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
                ></span>
              </ListItemButton>
              {props.clickedFolder[0] === folder.fileName
                ? createList(
                    mapFolderList,
                    folder.fileName ?? '',
                    props.clickedFolder,
                    loopCount,
                    filePath,
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
      {(loopCount.current = 0)}
    </>
  )
}

const createList = (
  mapFolderList: Map<number, Array<FileInfo>>,
  folder: string,
  clickedFolder: Array<string>,
  loopCount: React.MutableRefObject<number>,
  filePath: string,
  handleClick: React.MouseEventHandler
) => {
  const mapSize = mapFolderList.size
  if (mapSize === 1) {
    return
  }

  loopCount.current = loopCount.current + 1
  const fileNameList = mapFolderList.get(loopCount.current)

  return (
    <List component="nav" disablePadding>
      {fileNameList?.map((fileName, index) => {
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
                primary={fileName.fileName}
                onClick={handleClick}
              ></ListItemText>
              <span
                style={{ display: 'none' }}
                data-path={fileName.filePath + '/' + fileName.fileName}
                data-row={loopCount.current}
              ></span>
            </ListItemButton>
            {loopCount.current < mapSize - 1 &&
            fileName.fileName === clickedFolder[loopCount.current]
              ? createList(
                  mapFolderList,
                  folder,
                  clickedFolder,
                  loopCount,
                  filePath,
                  handleClick
                )
              : ''}
          </ListItem>
        )
      })}
    </List>
  )
}

export default SideMenu
