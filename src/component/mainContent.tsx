const MainContent: React.FC<{
  folderList: Array<string>
}> = props => {
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
        {props.folderList.map(folder => {
          return (
            <tr>
              <td>{folder}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default MainContent
