<#
.SYNOPSIS
  Executa os scripts npm do projeto a partir de um diretório local (NTFS).

.DESCRIPTION
  Esta pasta fica no Google Drive, que não suporta as gravações concorrentes
  do npm (erro EBADF) nem junctions/symlinks. Este script mantém um
  "runner" local em %USERPROFILE%\dev\jr-frutas-runner com:
    - node_modules e .next em disco local
    - junctions src/ e public/ apontando para ESTA pasta (código continua aqui)
    - cópia dos arquivos de configuração (package.json, tsconfig etc.)

.EXAMPLE
  .\run.ps1 install     # instala dependências
  .\run.ps1 dev         # servidor de desenvolvimento (http://localhost:3000)
  .\run.ps1 lint
  .\run.ps1 typecheck
  .\run.ps1 build
  .\run.ps1 start
#>
param(
  [Parameter(Position = 0)] [string] $Script = "dev",
  [Parameter(ValueFromRemainingArguments = $true)] [string[]] $Rest
)

$ErrorActionPreference = "Stop"
$proj   = $PSScriptRoot
$runner = Join-Path $env:USERPROFILE "dev\jr-frutas-runner"
$config = @("package.json", "package-lock.json", "tsconfig.json", "next.config.ts", "postcss.config.mjs", "eslint.config.mjs", ".gitignore")

New-Item -ItemType Directory -Force $runner | Out-Null

foreach ($dir in @("src", "public")) {
  $link = Join-Path $runner $dir
  if (-not (Test-Path $link)) {
    cmd /c mklink /J "$link" "$(Join-Path $proj $dir)" | Out-Null
  }
}

foreach ($f in $config) {
  $srcFile = Join-Path $proj $f
  if (Test-Path $srcFile) { Copy-Item $srcFile (Join-Path $runner $f) -Force }
}

Push-Location $runner
try {
  if ($Script -eq "install") {
    npm install --no-audit --no-fund @Rest
    # devolve o lockfile para a pasta do projeto (versionável)
    Copy-Item (Join-Path $runner "package-lock.json") (Join-Path $proj "package-lock.json") -Force
  } else {
    if (-not (Test-Path (Join-Path $runner "node_modules\.bin\next.cmd"))) {
      Write-Host "node_modules ausente — executando install..." -ForegroundColor Yellow
      npm install --no-audit --no-fund
      Copy-Item (Join-Path $runner "package-lock.json") (Join-Path $proj "package-lock.json") -Force
    }
    npm run $Script -- @Rest
  }
} finally {
  Pop-Location
}
