const scrape = require('./scrape');
const rarbg = require('./sites/rarbg');
const tpb = require('./sites/tpb');
const getOrMakeSite = require('./fetch');

// function returns a promise.all of all site scrapes
let pSS = (sites) => {
  // create an array of promises
  const sitesPromiseArr = sites.map((siteObj) => {
    console.log('&');
    return getOrMakeSite(siteObj).then(async (site) => {
      console.log('woot woor wood wook wooz woob woon');
      const groups = await Promise.all(site.groups.map((group) => {
        console.log('&&');
        return group;
        // return scrape(group)
      }));
      site.groups = groups;
      return site;
    });
  });
  return Promise.all(sitesPromiseArr);
};

let sites = [];
sites = sites.concat(rarbg, tpb);

pSS = pSS.bind(null, sites);

module.exports = pSS;
