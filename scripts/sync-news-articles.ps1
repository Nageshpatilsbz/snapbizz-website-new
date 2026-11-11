$ErrorActionPreference = 'Stop'

$slugs = @(
  'powering-icici-banks-eazystore-solution',
  'our-challenge-now-is-to-build-a-robust-distribution-network-to-cater-over-200-cities-prem-kumar-founder-ceo-snapbizz',
  'consumption-gets-a-bharat-boost',
  'consumers-making-key-trade-offs-in-festive-spending',
  'kiranas-flock-to-b2b-apps-for-supplies',
  'customers-vocal-for-local-finds-survey',
  'how-retail-tech-startup-snapbizz-scaled-its-business-and-clocked-rs-7-cr-revenue-amidst-covid-19-pandemic',
  'kirana-stores-the-new-heroes-of-indian-economy-during-covid-19',
  'how-tech-start-ups-fmcg-majors-are-helping-kirana-stores-go-digital',
  'in-covid-19-world-digital-distribution-platforms-become-strong-alternative-for-fmcg-majors'
)

$posts = foreach ($slug in $slugs) {
  $uri = "https://snapbizz.com/wp-json/wp/v2/posts?slug=$slug&_fields=slug,content"
  $result = Invoke-RestMethod -Uri $uri
  if ($result.Count -ne 1) { throw "Expected one article for '$slug'." }
  $result[0]
}

$json = ConvertTo-Json -InputObject @($posts) -Depth 20 -Compress
$json | node scripts/sync-news-articles.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }