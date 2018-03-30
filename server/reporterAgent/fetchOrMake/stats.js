const { RALogger } = require('../../logging');
const { sendError } = require('../../notifier/email/emails');
const { TorrentStats, TorrentSnapshot } = require('../../db/models');
const fullSitesToSnapshots = require('../utils/fullSitesToSnapshots');
const {
  getSnapshotCount,
  getTorrentCount,
  getGroupCount,
  getInfoCount,
  getScrapeCount,
  getSiteCount,
} = require('../utils/fetchCounts');

const initStat = () =>
  TorrentStats.create({
    active: true,
  });

const setCloseStat = statObj =>
  TorrentStats.findOne({ where: { active: true } }).then((activeStat) => {
    const newStatObj = { ...statObj };
    newStatObj.active = false;
    return activeStat.update(newStatObj, {
      fields: [
        'siteCount',
        'siteLoadCount',
        'scrapeCount',
        'torrentCount',
        'torrentLoadCount',
        'groupLoadCount',
        'groupCount',
        'snapshotCount',
        'infoCount',
        'active',
        'endedAt',
      ],
    });
  });

const addSnapshots = snapshotArr =>
  TorrentSnapshot.bulkCreate(snapshotArr).catch((err) => {
    RALogger.error('----- ERR WITH BULK CREATE -----');
    RALogger.error(err);
  });

const closeStat = async (fullSites) => {
  /* things done at this point to data:
        - created stat row with active for this scrape
        - created/found site/group/listing/info for each torrent
      */
  const gScrapeCount = await getScrapeCount();
  const snapshotsArr = fullSitesToSnapshots(fullSites, gScrapeCount);
  await addSnapshots(snapshotsArr);
  const gSiteCount = await getSiteCount();
  const gGroupCount = await getGroupCount();
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
  RALogger.verbose('stat OBJ', statObj);
  await setCloseStat(statObj);
  return snapshotsArr;
};

module.exports = {
  initStat,
  setCloseStat,
  closeStat,
};
