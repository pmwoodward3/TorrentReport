// require babel polyfill for testing purposes
require('babel-polyfill');
const Promise = require('bluebird');
const scrape = require('./scrape');
const rarbg = require('./sites/rarbg');
const tpb = require('./sites/tpb');
const { getOrMakeSite, getSnapshotCount } = require('./fetch');
const { checkSnapshot } = require('./check');
const { initStat, closeStat, addSnapshots } = require('./store');
const { clean } = require('./clean');

// function returns a promise.all of all site scrapes
let pSS = async (sites) => {
  const shouldGetSnaps = await checkSnapshot();
  // create an array of promises
  if (shouldGetSnaps) {
    initStat(); // creates active stat obj
    return Promise.mapSeries(sites, siteObj =>
      getOrMakeSite(siteObj).then(async (site) => {
        const newSite = Object.assign({}, site);
        const newGroups = await Promise.mapSeries(site.groups, scrape);
        newSite.groups = newGroups;
        return newSite;
      })).then(async (fullSites) => {
      /* things done at this point to data:
          - created stat row with active for this scrape
          - created/found site/group/listing/info for each torrent
        */
      const snapshotsArr = clean(fullSites);
      await addSnapshots(snapshotsArr);
      const snapshotCount = await getSnapshotCount();
      const statObj = {
        siteCount: fullSites.length,
        torrentCount: 0,
        groupCount: 0,
        snapshotCount: parseInt(snapshotCount, 10),
        active: false,
        endedAt: new Date(),
      };

      fullSites.forEach((site) => {
        statObj.groupCount += site.groups.length;
        site.groups.forEach((group) => {
          statObj.torrentCount += group.results.length;
        });
      });
      console.log('stat OBJ', statObj);
      closeStat(statObj);
      return fullSites;
    });
  }
  console.log('should not get stuff');
  return false;
};

let sites = [];

// sites = sites.concat(rarbg, tpb);
sites = sites.concat(tpb);
pSS = pSS.bind(null, sites);

module.exports = pSS;
