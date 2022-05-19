import React from 'react'
import FileInfo from '../@types/fileInfo'

/**
 * メインコンテンツ部view
 *
 * @param props props
 */
const MainContent: React.FC<{
  folderList: Array<string> | Array<FileInfo>
  handleClick: (e: React.MouseEvent) => void
}> = (props) => {
  const folderList: Array<string> | Array<FileInfo> = props.folderList
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>名前</th>
          <th>更新日時</th>
          <th>種類</th>
          <th>サイズ</th>
        </tr>
      </thead>
      <tbody>
        {folderList.map((folder, index) => {
          console.log(folder)
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
