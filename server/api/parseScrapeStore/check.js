const { TorrentStats } = require('../../db/models');

const checkSnapshot = async () => {
  const isActive = await TorrentStats.findOne({ where: { active: true } }).then(result => result != null);
  const isNotFresh = await TorrentStats.max('id')
    .then(maxId => TorrentStats.findById(maxId))
    .then((latestStat) => {
      const today = new Date();
      const lastDate = new Date(latestStat.endedAt);
      const timeDiff = lastDate.getTime() - today.getTime();
      const diffDays = timeDiff / (1000 * 3600 * 22);
      if (diffDays <= -1) {
        console.log('*************** was yesterday or greater');
      }
      return diffDays <= -1;
    });
  return !isActive && isNotFresh;
};

module.exports = { checkSnapshot };
