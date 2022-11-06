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
  handleClick: (e: React.MouseEvent) => void
}> = (props) => {
  const folderList = props.folderList
  const volumeLabelList = props.volumeLabelList
  return (
    <>
      <Box>
        <List>
          {folderList.map((folder, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={folder.fileName}></ListItemText>
                </ListItemButton>
              </ListItem>
            )
          })}
          {volumeLabelList.map((volumeLabel, index) => {
            return (
              <ListItem key={index} alignItems={'flex-start'}>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={volumeLabel}></ListItemText>
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
