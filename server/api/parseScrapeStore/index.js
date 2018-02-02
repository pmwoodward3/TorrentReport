// require babel polyfill for testing purposes
require('babel-polyfill');
const scrape = require('./scrape');
const rarbg = require('./sites/rarbg');
const tpb = require('./sites/tpb');
const { getOrMakeSite } = require('./fetch');

// function returns a promise.all of all site scrapes
let pSS = (sites) => {
  // create an array of promises
  const sitesPromiseArr = sites.map(siteObj =>
    getOrMakeSite(siteObj).then(async (site) => {
      const newSite = Object.assign({}, site);
      const newGroups = await Promise.all(site.groups.map(group => scrape(group)));
      newSite.groups = newGroups;
      return newSite;
    }));
  return Promise.all(sitesPromiseArr);
};

let sites = [];

sites = sites.concat(rarbg, tpb);
pSS = pSS.bind(null, sites);

module.exports = pSS;
