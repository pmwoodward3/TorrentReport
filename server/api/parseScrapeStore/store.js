const { sendError } = require('../../notifier/email/emails');
const { TorrentStats, TorrentSnapshot } = require('../../db/models');

const initStat = () =>
  TorrentStats.create({
    active: true,
  });

const closeStat = (statObj) => {
  TorrentStats.findOne({ where: { active: true } })
    .then(activeStat =>
      activeStat.update(statObj, {
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
          'snapshotCount',
          'active',
          'endedAt',
        ],
      }))
    .catch((err) => {
      console.error('\n----- ERR WITH closing stat -----\n');
      console.error(err);
      sendError(`error in closing stat - ${err}`);
    });
};

const addSnapshots = snapshotArr =>
  TorrentSnapshot.bulkCreate(snapshotArr).catch((err) => {
    console.error('\n----- ERR WITH BULK CREATE -----\n');
    console.error(err);
    sendError(`error in bulk stat create - ${err}`);
  });

module.exports = { initStat, closeStat, addSnapshots };
