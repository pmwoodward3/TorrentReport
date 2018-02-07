// require babel polyfill for testing purposes
require('babel-polyfill');
const Promise = require('bluebird');
const scrape = require('./scrape');
const rarbg = require('./sites/rarbg');
const tpb = require('./sites/tpb');
const {
  getOrMakeSite,
  getSnapshotCount,
  getTorrentCount,
  getGroupCount,
  getInfoCount,
  getListCount,
  getScrapeCount,
  getSiteCount,
} = require('./fetch');
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
      const gSiteCount = await getSiteCount();
      const gScrapeCount = await getScrapeCount();
      const gGroupCount = await getGroupCount();
      const gListCount = await getListCount();
      const ginfoCount = await getInfoCount();
      const snapshotCount = await getSnapshotCount();
      const getTCount = await getTorrentCount();
      const statObj = {
        siteCount: parseInt(gSiteCount, 10),
        siteLoadCount: fullSites.length,
        scrapeCount: parseInt(gScrapeCount, 10),
        torrentCount: parseInt(getTCount, 10),
        torrentLoadCount: 0,
        groupCount: parseInt(gGroupCount, 10),
        groupLoadCount: 0,
        listingCount: parseInt(gListCount, 10),
        infoCount: parseInt(ginfoCount, 10),
        snapshotCount: parseInt(snapshotCount, 10),
        active: false,
        endedAt: new Date(),
      };

      fullSites.forEach((site) => {
        statObj.groupLoadCount += site.groups.length;
        site.groups.forEach((group) => {
          statObj.torrentLoadCount += group.results.length;
        });
      });
      console.log('stat OBJ', statObj);
      closeStat(statObj);
      return snapshotsArr;
      // return fullSites;
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
