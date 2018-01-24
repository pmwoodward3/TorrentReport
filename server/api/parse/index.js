const scrape = require('./scrape')

const sites = [
  {
    name: 'rarbg',
    resourceDomain: 'rarbg.to',
    webPage:
      'https://rarbg.to/top100.php?category%5B%5D=14&category%5B%5D=48&category%5B%5D=17&category%5B%5D=44&category%5B%5D=45&category%5B%5D=47&category%5B%5D=50&category%5B%5D=51&category%5B%5D=52&category%5B%5D=42&category%5B%5D=46&category%5B%5D=49',
    selectors: [
      'body > table:nth-child(6) > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > a:nth-child(1)'
    ]
  }
]

let fetch = sites => {
  const sitesArr = sites.map(site => {
    return scrape(site)
  })
  return Promise.all(sitesArr)
}

fetch = fetch.bind(null, sites)

module.exports = fetch
