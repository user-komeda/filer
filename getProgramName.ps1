$query = reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Applications" /s  /f Open /k /t REG_SZ

$query2 = reg query "HKEY_USERS\S-1-5-21-156678898-2790239451-3707509433-1001\SOFTWARE\Classes\Applications" /s  /f Open /k /t REG_SZ

$query3 = $query + $query2

foreach ($result in $query3) {
  # echo $item2
  $programNameList = $result.split("")
  if ($programNameList.lastIndexOF('  ') -ne -1 || $programNameList.length -ne -1) {
    $programNameList = [string]$programNameList
    if ($programNameList.Contains('FriendlyAppName')) {
      echo $programNameList.remove(0, $programNameList.lastIndexOF('  '))
    }
  }
}
