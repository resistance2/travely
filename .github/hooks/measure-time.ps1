param($command)

$start = Get-Date
Invoke-Expression $command
$duration = (Get-Date) - $start
Write-Host "`n$command took $($duration.TotalSeconds) seconds"