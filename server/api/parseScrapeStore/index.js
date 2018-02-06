// require babel polyfill for testing purposes
require('babel-polyfill');
const Promise = require('bluebird');
const scrape = require('./scrape');
const rarbg = require('./sites/rarbg');
const tpb = require('./sites/tpb');
const { getOrMakeSite } = require('./fetch');
const { checkSnapshot } = require('./check');

// function returns a promise.all of all site scrapes
let pSS = async (sites) => {
  const shouldGetSnaps = await checkSnapshot();
  // create an array of promises
  // const sitesPromiseArr = sites.map();
  if (shouldGetSnaps) {
    return Promise.mapSeries(sites, siteObj =>
      getOrMakeSite(siteObj).then(async (site) => {
        const newSite = Object.assign({}, site);
        const newGroups = await Promise.mapSeries(site.groups, scrape);
        newSite.groups = newGroups;
        return newSite;
      }));
  }
  console.log('should not get stuff');
  return false;
};

let sites = [];

sites = sites.concat(rarbg, tpb);
// sites = sites.concat(tpb);
pSS = pSS.bind(null, sites);

module.exports = pSS;
