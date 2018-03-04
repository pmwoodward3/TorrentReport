const TorrentStats = require('../../db/models/torrentStats');

const safeToRunAgent = () =>
  // check if an active stat agent is running
  TorrentStats.findOne({ where: { active: true } })
    .then((result) => {
      if (!result) return false;
      // check if enough time has elapsed since last scrape
      return TorrentStats.max('id').then(maxId => TorrentStats.findById(maxId));
    })
    .then((latestStat) => {
      const today = new Date();
      const lastDate = new Date(latestStat.createdAt);
      const timeDiff = lastDate.getTime() - today.getTime();
      const diffDays = timeDiff / (1000 * 3600 * 22);
      return diffDays <= -1;
    });

module.exports = safeToRunAgent;
