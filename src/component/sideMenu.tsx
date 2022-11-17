/* eslint-disable jsdoc/no-undefined-types */
import React from 'react'
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
  clickedFolder: string
  handleClick: (e: React.MouseEvent) => void
}> = (props) => {
  const loopCount = 0
  const mapFolderList = props.folderList ?? new Map<number, Array<FileInfo>>()
  const folderList = mapFolderList.get(0)
  const volumeLabelList = props.volumeLabelList
  const mapSize = props.folderList.size
  const handleClick = props.handleClick
  props.folderList.has
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
              <ListItemButton>
                <ListItemIcon onClick={handleClick}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </ListItemIcon>
                <ListItemText
                  primary={folder.fileName}
                  onClick={handleClick}
                ></ListItemText>
              </ListItemButton>
              {createList(mapSize, loopCount, handleClick)}
            </ListItem>
          )
        })}
        {volumeLabelList.map((volumeLabel, index) => {
          console.log(volumeLabel)
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

const createList = (
  mapSize: number,
  loopCount: number,
  handleClick: React.MouseEventHandler
) => {
  if (mapSize === 1) {
    return
  }
  loopCount++
  console.log(mapSize, loopCount)
  return (
    <List component="div" disablePadding>
      <ListItem
        sx={{
          display: 'block',
        }}
      >
        <ListItemButton sx={{ pl: 1 }}>
          <ListItemIcon onClick={handleClick}>
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
          </ListItemIcon>
          <ListItemText primary={'bbb'} onClick={handleClick}></ListItemText>
        </ListItemButton>
        {loopCount < mapSize - 1
          ? createList(mapSize, loopCount, handleClick)
          : ''}
      </ListItem>
    </List>
  )
}

export default SideMenu
