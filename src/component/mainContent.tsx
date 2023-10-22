import React from 'react'
import FileInfo from '../@types/fileInfo'
import MainContentRequest from '../request/MainContentRequest'

/**
 *mainContent部コンポーネント
 *
 * @param props - props
 *
 * @returns jsx
 */
const MainContent: React.FC<{
  mainContentRequest: MainContentRequest
}> = props => {
  const mainContentRequest = props.mainContentRequest
  const folderList: Array<FileInfo> =
    mainContentRequest.folderList !== null ? mainContentRequest.folderList : []

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th
            id='fileName'
            onClick={event => mainContentRequest.sortFunction(event)}
          >
            名前
          </th>
          <th
            id='fileUpdateTime'
            onClick={event => mainContentRequest.sortFunction(event)}
          >
            更新日時
          </th>
          <th
            id='fileType'
            onClick={event => mainContentRequest.sortFunction(event)}
          >
            種類
          </th>
          <th
            id='fileSize'
            onClick={event => mainContentRequest.sortFunction(event)}
          >
            サイズ
          </th>
        </tr>
      </thead>
      <tbody>
        {folderList.map((folder, index) => {
          return (
            <tr key={index}>
              <td
                className='folder'
                onClick={event => mainContentRequest.handleClick(event)}
              >
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
