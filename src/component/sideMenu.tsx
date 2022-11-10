import React from 'react'
import Box from '@mui/material/Box'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import FileInfo from '../@types/fileInfo'
import { start } from 'repl'

/**
 * sideMenu
 *
 * @param props props
 * @returns jsx
 */
const SideMenu: React.FC<{
  folderList: Array<FileInfo>
  volumeLabelList: Array<string>
  clickedFolder: string
  handleClick: (e: React.MouseEvent) => void
}> = props => {
  const folderList = props.folderList
  const volumeLabelList = props.volumeLabelList

  const handleClick = props.handleClick
  return (
    <>
      <Box>
        <List>
          {folderList.map((folder, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemText primary={folder.fileName} onClick={handleClick}>
                    <p>ssssss</p>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            )
          })}
          {volumeLabelList.map((volumeLabel, index) => {
            console.log(volumeLabel)
            return (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemText
                    primary={volumeLabel}
                    onClick={handleClick}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </>
  )
}
export default SideMenu
