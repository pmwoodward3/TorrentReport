const { TorrentStats } = require('../../db/models');

const initStat = () =>
  TorrentStats.create({
    active: true,
  });

const closeStat = statObj =>
  TorrentStats.findOne({ where: { active: true } }).then((activeStat) => {
    statObj.active = false;
    return activeStat.update(statObj, {
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

module.exports = {
  initStat,
  closeStat,
};
