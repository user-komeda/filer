/**
 *RefList
 */
export default interface RefList {
  /**
   *row
   */
  row: React.MutableRefObject<number>
  /**
   *sideMenuFolderPath
   */
  sideMenuFolderPath: React.MutableRefObject<string>
  /**
   *sameFolderDeletedFlag
   */
  sameFolderDeletedFlag: React.MutableRefObject<boolean>
}
