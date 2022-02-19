import { Menu, MenuItemConstructorOptions } from 'electron'

const newFile = () => {
  console.log('a')
}

const template: MenuItemConstructorOptions[] = [
  {
    label: 'ファイル',
    submenu: [
      { role: 'close', label: 'ウィンドウを閉じる' },
      {
        label: '新しいフォルダ',
        click: newFile,
        accelerator: 'CmdOrCtrl+Shift+G'
      },
      {
        label: '表示',
        submenu: [
          { label: '特大アイコン' },
          { label: '大アイコン' },
          { label: '中アイコン' },
          { label: '小アイコン' },
          { label: '詳細' },
          { label: '並べて表示' },
          { label: '一覧表示' }
        ]
      },
      {
        label: '並べ替え',
        submenu: [
          { label: '名前' },
          { label: '更新日時' },
          { label: '種類' },
          { label: 'サイズ' },
          { label: '昇順' },
          { label: '降順' }
        ]
      }
    ]
  },
  {
    label: '編集',
    submenu: [
      { role: 'undo', label: '元に戻す' },
      { role: 'redo', label: 'やり直す' },
      { type: 'separator' },
      { role: 'cut', label: '切り取り' },
      { role: 'copy', label: 'コピー' },
      { role: 'paste', label: '貼り付け' }
    ]
  },
  {
    label: '表示',
    submenu: [
      { role: 'undo', label: '元に戻す' },
      { role: 'redo', label: 'やり直す' },
      { type: 'separator' },
      { role: 'cut', label: '切り取り' },
      { role: 'copy', label: 'コピー' },
      { role: 'paste', label: '貼り付け' }
    ]
  },
  {
    label: 'お気に入り',
    submenu: [
      { role: 'undo', label: 'お気に入りに追加' },
      { role: 'redo', label: '編集' },
      { type: 'separator' },
      { role: 'cut', label: '切り取り' },
      { role: 'copy', label: 'コピー' },
      { role: 'paste', label: '貼り付け' }
    ]
  },
  {
    label: 'ツール',
    submenu: [
      { role: 'undo', label: 'カスタマイズの再読み込み' },
      { role: 'redo', label: 'レイアウトの読み込み' },
      { role: 'cut', label: 'レイアウトを保存' },
      { role: 'copy', label: 'アドオン' },
      { role: 'paste', label: 'オプション' }
    ]
  },
  {
    label: 'ヘルプ',
    submenu: [
      { role: 'undo', label: '最新版の確認' },
      { role: 'redo', label: 'アドオンを入手' },
      { type: 'separator' },
      { role: 'cut', label: 'アイコンを入手' },
      { role: 'copy', label: 'コピー' },
      { role: 'paste', label: '貼り付け' }
    ]
  }
]

if (process.platform === 'darwin') template.unshift({ role: 'appMenu' })

export const menu = Menu.buildFromTemplate(template)
