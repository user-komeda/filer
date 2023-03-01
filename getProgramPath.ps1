$query = reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Applications" /s  /f Command /k /t REG_SZ

$query2 = reg query "HKEY_USERS\S-1-5-21-156678898-2790239451-3707509433-1001\SOFTWARE\Classes\Applications" /s  /f Command /k /t REG_SZ

$query3 = $query + $query2

foreach ($result in $query3) {
  $programPathList = $result.split("  ")
  $programPathList = $programPathList[-1]

  $index = $programPathList.lastIndexOF(' ')
  if ($index -ne -1) {

    $programPathList.remove($index, $programPathList.length - $index)
    $programPathList = $programPathList[0]
  }
}

foreach ($programPath in $programPathList) {
  echo $programPath
}
