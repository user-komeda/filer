import { MouseEventHandler } from 'react'
import { ipcRenderer } from '../@types/ipcRender'

const MainContent: React.FC<{
  folderList: Array<string>
  handleClick: (e: React.MouseEvent) => void
}> = props => {
  let folderList: Array<string> = props.folderList

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
        {folderList.map(folder => {
          return (
            <tr>
              <td className='folder' onClick={props.handleClick}>
                {folder}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default MainContent
