import FileInfo from '../@types/fileInfo'
import StateList from '../@types/stateList'
import { useInitRefList, useInitStateList } from '../util/stateList'
import { renderHook, act } from '@testing-library/react'

const expectValue: StateList = {
  lastPath: 'c://Users/user/',
  nowPath: '',
  folderList: [],
  sideMenuFolderList: new Map(),
  filteredFolderList: [],
  flag: false,
  programNameList: [],
  iconList: [],
  isSortTypeAsc: true,
  volumeLabelList: [],
  clickedFolderList: [],
  colCountList: [],
  rowCountList: [],
}

test('setLastPathTest', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.lastPath = 'c://Users/user/test/test'
  expect(result.result.current[0].lastPath).toEqual('c://Users/user/')
  act(() => {
    result.result.current[1].setLastPath('c://Users/user/test/test')
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setLastPathTest', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.nowPath = 'c://Users/user/'
  expect(result.result.current[0].nowPath).toEqual('')
  act(() => {
    result.result.current[1].setNowPath('c://Users/user/')
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setFlagTest', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.flag = true
  expect(result.result.current[0].flag).toEqual(false)
  act(() => {
    result.result.current[1].setFlag(true)
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setIsSortTypeAsc', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.isSortTypeAsc = false
  expect(result.result.current[0].isSortTypeAsc).toEqual(true)
  act(() => {
    result.result.current[1].setIsSortTypeAsc(false)
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setFolderList', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  const fileInfo: FileInfo = {
    fileName: 'file',
    fileSize: 10,
    filePath: 'c://',
    fileType: 'text',
    updateFileTime: '2022/10/12',
  }
  localExpectValue.folderList = [fileInfo]
  expect(result.result.current[0].folderList).toEqual([])
  act(() => {
    result.result.current[1].setFolderList([fileInfo])
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setFilteredFolderList', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  const fileInfo: FileInfo = {
    fileName: 'file',
    fileSize: 10,
    filePath: 'c://',
    fileType: 'text',
    updateFileTime: '2022/10/12',
  }
  localExpectValue.filteredFolderList = [fileInfo]
  expect(result.result.current[0].filteredFolderList).toEqual([])
  act(() => {
    result.result.current[1].setFilteredFolderList([fileInfo])
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setProgramNameList', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.programNameList = ['java', 'php']
  expect(result.result.current[0].programNameList).toEqual([])
  act(() => {
    result.result.current[1].setProgramNameList(['java', 'php'])
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setIconList', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.iconList = ['icon1', 'icon2']
  expect(result.result.current[0].iconList).toEqual([])
  act(() => {
    result.result.current[1].setIconList(['icon1', 'icon2'])
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setVolumeLabelList', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.volumeLabelList = ['c', 'd']
  expect(result.result.current[0].volumeLabelList).toEqual([])
  act(() => {
    result.result.current[1].setVolumeLabelList(['c', 'd'])
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setClickedFolderList', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.clickedFolderList = ['desktop', 'document']
  expect(result.result.current[0].clickedFolderList).toEqual([])
  act(() => {
    result.result.current[1].setClickedFolderList(['desktop', 'document'])
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setColCountList', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.colCountList = ['1', '2']
  expect(result.result.current[0].colCountList).toEqual([])
  act(() => {
    result.result.current[1].setColCountList(['1', '2'])
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setRowCountList', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  localExpectValue.rowCountList = ['1', '2']
  expect(result.result.current[0].rowCountList).toEqual([])
  act(() => {
    result.result.current[1].setRowCountList(['1', '2'])
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('setSideMenuFolderList', () => {
  const result = renderHook(useInitStateList)
  const localExpectValue = Object.assign({}, expectValue)
  const fileInfo: FileInfo = {
    fileName: 'file',
    fileSize: 10,
    filePath: 'c://',
    fileType: 'text',
    updateFileTime: '2022/10/12',
  }
  const tmpMap = new Map()
  const tmpMap2 = new Map()
  const tmpMap3 = new Map()
  tmpMap3.set(1, [fileInfo])
  tmpMap2.set('2_0', tmpMap3)
  tmpMap.set('desktop', tmpMap2)

  localExpectValue.sideMenuFolderList = tmpMap
  expect(result.result.current[0].sideMenuFolderList).toEqual(new Map())
  act(() => {
    result.result.current[1].setSideMenuFolderList(tmpMap)
  })
  expect(result.result.current[0]).toEqual(localExpectValue)
})

test('useRefList', () => {
  const result = renderHook(useInitRefList)
  expect(result.result.current.row.current).toEqual(-1)
  expect(result.result.current.sideMenuFolderPath.current).toEqual('')
  expect(result.result.current.sameFolderDeletedFlag.current).toEqual(true)
})
