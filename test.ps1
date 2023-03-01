# プロパティを調べたいファイルを指定
$path = Convert-Path $args[0]



$shell = New-Object -COMObject Shell.Application

$fileList=Get-ChildItem $path

# フォルダとファイル名を変数に設定
$folder =  $path

$Getfolder = $shell.Namespace($folder)
foreach($file in $fileList){
$Getfile = $Getfolder.ParseName($file.name)
echo $Getfile.Type
}
