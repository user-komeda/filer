/**
 * ファイルの属性の定義
 */
export default interface FileInfo {
  /**
   * ファイル名
   */
  fileName?: string
  /**
   * フィルサイズ
   */
  fileSize?: number
  /**
   * ファイル更新日
   */
  updateFileTime?: string
  /**
   * ファイル拡張子
   */
  fileType?: string
  /**
   * ファイルパス
   */
  filePath?: string
}
