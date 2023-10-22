export default interface RefList {
  row: React.MutableRefObject<number>
  sideMenuFolderPath: React.MutableRefObject<string>
  sameFolderDeletedFlag: React.MutableRefObject<boolean>
}
