import React from 'react'
import FileInfo from './fileInfo'

/**
 * メソッドの引数となりうるstateの一覧
 */
export default interface StateListRequest {
  /**
   *サイドメニューのフォルダ一覧
   */
  sideMenuFolderList: Map<string, Map<string, Map<number, Array<FileInfo>>>>

  /**
   *クリックしたフォルダーのList
   */
  clickedFolderList: Array<string>

  /**
   *同じフォルダをクリックしたかどうか
   */
  sameFolderDeletedFlag: React.MutableRefObject<boolean>

  /**
   *開いているフォルダの数
   */
  row: React.MutableRefObject<number>

  /**
   * サイドメニューのフォルダパス
   */
  sideMenuFolderPath: React.MutableRefObject<string>

  /**
   *開いている階層のリスト
   */
  colCountList: Array<string>

  /**
   *開いてるフォルダの個数
   */
  rowCountList: Array<number>

  /**
   *最後のパスの設定
   */
  setLastPath: React.Dispatch<React.SetStateAction<string>>

  /**
   *現在のパスの設定
   */
  setNowPath: React.Dispatch<React.SetStateAction<string>>

  /**
   *サイドメニューのフォルダ一覧の設定
   */
  setSideMenuFolderList: React.Dispatch<
    React.SetStateAction<Map<string, Map<string, Map<number, Array<FileInfo>>>>>
  >

  /**
   *クリックしたフォルダーのList設定
   */
  setClickedFolderList: React.Dispatch<React.SetStateAction<Array<string>>>

  /**
   *開いている階層のリスト設定
   */
  setColCountList: React.Dispatch<React.SetStateAction<Array<string>>>

  /**
   *開いてるフォルダの個数
   */
  setRowCountList: React.Dispatch<React.SetStateAction<Array<number>>>

  /**
   * メインコンテント内フォルダーリスト設定
   */
  setFolderList: React.Dispatch<React.SetStateAction<Array<FileInfo>>>
}
