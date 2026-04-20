$root = 'C:\Users\devir\OneDrive\שולחן העבודה\Dvir\Projects\Tiny Machines\tiny-machines'
$mapping = @{
  'src\designs\pairs\AmbulancopterSync.ts' = @{icon='🚑🚁'; rarity='common'}
  'src\designs\pairs\HighSpeedMedic.ts' = @{icon='🚑✈️'; rarity='common'}
  'src\designs\pairs\ExplosiveHealing.ts' = @{icon='🚑🚀'; rarity='common'}
  'src\designs\pairs\LotteryAmbulance.ts' = @{icon='🚑🎰'; rarity='common'}
  'src\designs\pairs\TrainwreckRescue.ts' = @{icon='🚑🚆'; rarity='common'}
  'src\designs\pairs\SkyWarriors.ts' = @{icon='🚁✈️'; rarity='common'}
  'src\designs\pairs\ArmadoHelicopter.ts' = @{icon='🚁🚀'; rarity='common'}
  'src\designs\pairs\SpinningRotor.ts' = @{icon='🚁🎰'; rarity='common'}
  'src\designs\pairs\SkylineCaravan.ts' = @{icon='🚁🚆'; rarity='common'}
  'src\designs\pairs\JetMissileBarrage.ts' = @{icon='✈️🚀'; rarity='common'}
  'src\designs\pairs\LuckyAce.ts' = @{icon='✈️🎰'; rarity='common'}
  'src\designs\pairs\SonicRail.ts' = @{icon='✈️🚆'; rarity='common'}
  'src\designs\pairs\LotteryStrike.ts' = @{icon='🚀🎰'; rarity='common'}
  'src\designs\pairs\RunawayExplosion.ts' = @{icon='🚆🚀'; rarity='common'}
  'src\designs\pairs\FortuneTrain.ts' = @{icon='🎰🚆'; rarity='common'}
  'src\designs\aliens\AlienAmbulance.ts' = @{icon='🛸🚑'; rarity='legendary'}
  'src\designs\aliens\AlienHelicopter.ts' = @{icon='🛸🚁'; rarity='legendary'}
  'src\designs\aliens\AlienJet.ts' = @{icon='🛸✈️'; rarity='legendary'}
  'src\designs\aliens\AlienMissile.ts' = @{icon='🛸🚀'; rarity='legendary'}
  'src\designs\aliens\AlienSlotMachine.ts' = @{icon='🛸🎰'; rarity='legendary'}
  'src\designs\aliens\AlienTrain.ts' = @{icon='🛸🚆'; rarity='legendary'}
}

foreach ($rel in $mapping.Keys) {
  $path = Join-Path $root $rel
  if (-not (Test-Path $path)) {
    Write-Host "File not found: $rel"
    continue
  }
  $text = Get-Content -Raw -Encoding UTF8 $path
  if ($text -match 'icon =') {
    Write-Host "Already has icon: $rel"
    continue
  }
  $icon = $mapping[$rel].icon
  $rarity = $mapping[$rel].rarity
  $newText = $text -replace '(description = "[^"]*";)', "`$1`n  icon = `"$icon`";`n  rarity = `"$rarity`";"
  if ($newText -ne $text) {
    Set-Content -Path $path -Value $newText -Encoding UTF8
    Write-Host "Updated: $rel"
  } else {
    Write-Host "No match for: $rel"
  }
}
Write-Host 'Done updating design files'
