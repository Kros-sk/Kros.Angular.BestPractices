Write-Output "Setting Proxy..."

$env:HTTP_PROXY = "http://192.168.1.3:3128"
$env:HTTPS_PROXY = "http://192.168.1.3:3128"

Write-Output "Opening Cypress..."

npx cypress open
