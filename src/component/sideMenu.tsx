import React from 'react'
import Box from '@mui/material/Box'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
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
  console.log('renderf')
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
              <ListItemButton>
                <ListItemText
                  primary={folder.fileName}
                  onClick={handleClick}
                ></ListItemText>
              </ListItemButton>
              <List component='div' disablePadding>
                <ListItem
                  sx={{
                    display: 'block',
                  }}
                  key={index}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText
                      primary={folder.fileName}
                      onClick={handleClick}
                    ></ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
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
    </>
  )
}
export default SideMenu
