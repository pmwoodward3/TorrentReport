const scrape = require('./scrape')
const rarbg = require('./sites/rarbg')
const tpb = require('./sites/tpb')

// function returns a promise.all of all site scrapes
let fetch = sites => {
  // create an array of promises
  const sitesPromiseArr = sites.map(site => {
    // scrape is a promise
    return scrape(site)
  })
  return Promise.all(sitesPromiseArr)
}

let sites = []
sites = sites.concat(rarbg, tpb)
fetch = fetch.bind(null, sites)

module.exports = fetch
