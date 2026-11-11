$ErrorActionPreference = 'Stop'
$OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$posts = Invoke-RestMethod -Uri 'https://snapbizz.com/wp-json/wp/v2/dt_testimonials?per_page=100&_fields=id,slug,date,title,excerpt,content,featured_media'
$mediaIds = @($posts | ForEach-Object { [int]$_.featured_media } | Where-Object { $_ -gt 0 } | Select-Object -Unique)
$mediaById = @{}

if ($mediaIds.Count -gt 0) {
  $include = $mediaIds -join ','
  $mediaItems = Invoke-RestMethod -Uri "https://snapbizz.com/wp-json/wp/v2/media?include=$include&per_page=100&_fields=id,source_url,alt_text"
  foreach ($media in $mediaItems) { $mediaById[[string]$media.id] = $media }
}

foreach ($post in $posts) {
  $media = $mediaById[[string]$post.featured_media]
  $post | Add-Member -NotePropertyName featuredImageUrl -NotePropertyValue $media.source_url -Force
  $post | Add-Member -NotePropertyName featuredImageAlt -NotePropertyValue $media.alt_text -Force
}

$json = ConvertTo-Json -InputObject @($posts) -Depth 60 -Compress
$manifest = $json | node scripts/sync-blog-articles.mjs | ConvertFrom-Json
$publicRoot = Join-Path (Split-Path -Parent $PSScriptRoot) 'public'

foreach ($asset in $manifest.assets) {
  $destination = Join-Path $publicRoot ($asset.path -replace '/', [IO.Path]::DirectorySeparatorChar)
  if (Test-Path $destination) { continue }
  $directory = Split-Path -Parent $destination
  if (!(Test-Path $directory)) { New-Item -ItemType Directory -Path $directory -Force | Out-Null }
  try {
    Invoke-WebRequest -Uri $asset.sourceUrl -OutFile $destination -UseBasicParsing
  } catch {
    throw "Failed to download Blog image '$($asset.sourceUrl)': $($_.Exception.Message)"
  }
}

Write-Output "Imported $($posts.Count) blog articles and $($manifest.assets.Count) images."