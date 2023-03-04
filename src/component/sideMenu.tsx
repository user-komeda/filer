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
  folderList: Map<string, Map<number, Map<number, Array<FileInfo>>>>
  volumeLabelList: Array<string>
  clickedFolder: Array<string>
  colCountList: Array<number>
  handleClick: (e: React.MouseEvent) => void
}> = (props): JSX.Element => {
  const basePath = 'c://Users/user/'
  const loopCount = useRef(1)
  const clickFolder = props.clickedFolder
  const mapFolderList =
    props.folderList ?? new Map<string, Map<number, Array<FileInfo>>>()
  console.log(mapFolderList)
  const folderList =
    mapFolderList.get('firstKey')?.get(0)?.get(0) ?? new Array<FileInfo>()
  const volumeLabelList = props.volumeLabelList
  const handleClick = props.handleClick

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
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
                  data-col={index}
                ></span>
              </ListItemButton>
              {clickFolder.includes(folder.fileName ?? '')
                ? createColList(
                    mapFolderList.get(folder.fileName ?? '') ??
                      new Map<number, Map<number, Array<FileInfo>>>(),
                    folder.fileName ?? '',
                    props.clickedFolder,
                    loopCount.current,
                    props.colCountList,
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
  mapFolderList: Map<number, Map<number, Array<FileInfo>>>,
  folder: string,
  clickedFolder: Array<string>,
  loopCount: number,
  colCountList: Array<number>,
  handleClick: React.MouseEventHandler
) => {
  // const fileNameList = mapFolderList.get(loopCount)

  return (
    <List component='nav' disablePadding>
      {colCountList.map(colcount => {
        {
          const tmpFileNameList = mapFolderList.get(colcount)
          const fileNameList = tmpFileNameList?.get(loopCount)
          fileNameList?.map((fileName, index) => {
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
                    data-row={loopCount}
                    data-col={colcount}
                    data-parent-folder={folder}
                  ></span>
                </ListItemButton>

                {fileName.fileName === clickedFolder[clickedFolder.length - 1]
                  ? createRowList(
                      tmpFileNameList ?? new Map(),
                      folder,
                      clickedFolder,
                      loopCount + 1,
                      handleClick
                    )
                  : ''}
              </ListItem>
            )
          })
        }
      })}
    </List>
  )
}

const createRowList = (
  mapFolderList: Map<number, Array<FileInfo>>,
  folder: string,
  clickedFolder: Array<string>,
  loopCount: number,
  handleClick: React.MouseEventHandler
) => {
  const fileNameList = mapFolderList.get(loopCount)

  return (
    <List component='nav' disablePadding>
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
                data-row={loopCount}
                data-col={index}
                data-parent-folder={folder}
              ></span>
            </ListItemButton>

            {fileName.fileName === clickedFolder[clickedFolder.length - 1]
              ? createRowList(
                  mapFolderList,
                  folder,
                  clickedFolder,
                  loopCount + 1,
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
