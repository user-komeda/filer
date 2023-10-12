/* eslint-disable jsdoc/no-undefined-types */
import React, {useRef} from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import FileInfo from '../@types/fileInfo';

/**
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
  console.log(props.folderList);
  const basePath = 'c://Users/user/';
  const loopCount = useRef(0);
  loopCount.current = 0;
  let number = 0;
  const mapFolderList =
    props.folderList ?? new Map<string, Map<number, Array<FileInfo>>>();
  const folderList =
    mapFolderList.get('firstKey')?.get('0')?.get(0) ?? new Array<FileInfo>();
  const volumeLabelList = props.volumeLabelList;
  const handleSideMenuSvgClick = props.handleSideMenuSvgClick;
  const handleSideMenuClick = props.handleSideMenuClick;
  return (
    <>
      <List
        sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Nested List Items
          </ListSubheader>
        }
      >
        {folderList.map((folder, index) => {
          number = props.clickedFolder.findIndex((x) => x === folder.fileName);
          return (
            <ListItem
              sx={{
                display: 'block',
              }}
              key={index}
            >
              <ListItemButton sx={{pl: 1}}>
                <ListItemIcon onClick={handleSideMenuSvgClick}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </ListItemIcon>
                <ListItemText
                  primary={folder.fileName}
                  onClick={handleSideMenuClick}
                ></ListItemText>
                <span
                  style={{display: 'none'}}
                  data-path={basePath + folder.fileName}
                  data-row={0}
                  data-col={index}
                ></span>
              </ListItemButton>
              {number !== -1 ?
                createColList(
                    mapFolderList.get(folder.fileName ?? '') ??
                      new Map<string, Map<number, Array<FileInfo>>>(),
                    folder.fileName ?? '',
                    props.clickedFolder,
                    loopCount,
                    props.colCountList,
                    handleSideMenuSvgClick,
                    handleSideMenuClick,
                ) :
                ''}
            </ListItem>
          );
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
          );
        })}
      </List>
    </>
  );
};

const createColList = (
    mapFolderList: Map<string, Map<number, Array<FileInfo>>>,
    folder: string,
    clickedFolder: Array<string>,
    loopCount: React.MutableRefObject<number>,
    colCountList: Array<string>,
    handleSideMenuSvgClick: React.MouseEventHandler,
    handleSideMenuClick: React.MouseEventHandler,
) => {
  const colCount = colCountList[loopCount.current];
  console.dir(colCountList);
  console.dir(loopCount.current);
  console.log(colCount);
  const tmpFileNameList =
    mapFolderList.get(colCount) ?? new Map<number, Array<FileInfo>>();
  console.log(tmpFileNameList);
  const keyList = Array.from(tmpFileNameList.keys());
  const fileNameList = tmpFileNameList?.get(keyList[0]);
  loopCount.current += 1;
  console.log('==============================================');
  return (
    <List component='nav' disablePadding>
      {fileNameList?.map((fileName, index) => {
        // document,kindleContent,mygame

        return (
          <div key={index}>
            <ListItem
              sx={{
                display: 'block',
              }}
              key={index}
            >
              <ListItemButton sx={{pl: 1}}>
                <ListItemIcon onClick={handleSideMenuSvgClick}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </ListItemIcon>
                <ListItemText
                  primary={fileName.fileName}
                  onClick={handleSideMenuClick}
                ></ListItemText>
                <span
                  style={{display: 'none'}}
                  data-path={fileName.filePath + '/' + fileName.fileName}
                  data-row={loopCount.current}
                  data-col={index}
                  data-parent-folder={folder}
                ></span>
              </ListItemButton>
              {clickedFolder.includes(fileName.fileName ?? '') ?
                createColList(
                    mapFolderList ?? new Map(),
                    folder,
                    clickedFolder,
                    loopCount,
                    colCountList,
                    handleSideMenuSvgClick,
                    handleSideMenuClick,
                ) :
                ''}
            </ListItem>
          </div>
        );
      })}
    </List>
  );
};

export default SideMenu;
