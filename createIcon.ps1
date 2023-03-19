$query = reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Applications" /s  /f Command /k /t REG_SZ

$query2 = reg query "HKEY_USERS\S-1-5-21-156678898-2790239451-3707509433-1001\SOFTWARE\Classes\Applications" /s  /f Command /k /t REG_SZ

$query3 = $query + $query2

$i = 0
foreach ($result in $query3) {
  $iconPathList = $result.Split('    ')[3]
  if (![string]::IsNullOrEmpty($iconPathList)) {
    $index = $iconPathList.lastIndexOF(' ')
    if ($index -eq -1) {
      continue
    }
    $iconPathList = $iconPathList.remove($iconPathList.lastIndexOF(' '), $iconPathList.length - $iconPathList.lastIndexOF(' '))

    if ($iconPathList.indexOf('--') -ne -1) {
      $iconPathList = $iconPathList.remove($iconPathList.lastIndexOF(' '), $iconPathList.length - $iconPathList.lastIndexOF(' '))
    }
    $iconPathList = $iconPathList.remove(0, 1)
    $iconPathList = $iconPathList.remove($iconPathList.length - 1, 1)
    $result = Test-Path $iconPathList
    $icon = [System.Drawing.Icon]::ExtractAssociatedIcon($iconPathList)
    $icon.ToBitmap().Save((Join-Path $env:UserProfile\Desktop\learning\electron\filer\icon "${i}icon.bmp"))
    $icon.Dispose()
    $i++
  }
}
