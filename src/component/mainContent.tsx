import React from 'react'
import FileInfo from '../@types/fileInfo'

/**
 * メインコンテンツ部view
 *
 * @param props - props
 */
const MainContent: React.FC<{
  folderList: null | Array<FileInfo>
  handleClick: (e: React.MouseEvent) => void
  sortFunction: (e: React.MouseEvent) => void
}> = (props) => {
  const folderList: Array<FileInfo> =
    props.folderList !== null ? props.folderList : []

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th id="fileName" onClick={props.sortFunction}>
            名前
          </th>
          <th id="fileUpdateTime" onClick={props.sortFunction}>
            更新日時
          </th>
          <th id="fileType" onClick={props.sortFunction}>
            種類
          </th>
          <th id="fileSize" onClick={props.sortFunction}>
            サイズ
          </th>
        </tr>
      </thead>
      <tbody>
        {folderList.map((folder, index) => {
          return (
            <tr key={index}>
              <td className="folder" onClick={props.handleClick}>
                {'string' === typeof folder ? folder : folder.fileName}
              </td>
              <td>{'string' === typeof folder ? '' : folder.updateFileTime}</td>
              <td>{'string' === typeof folder ? '' : folder.fileType}</td>
              <td>{'string' === typeof folder ? '' : folder.fileSize}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default MainContent
