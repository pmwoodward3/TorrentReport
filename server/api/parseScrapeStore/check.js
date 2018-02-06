const { TorrentStats } = require('../../db/models');

const checkSnapshot = () =>
  TorrentStats.max('id')
    .then(maxId => TorrentStats.findById(maxId))
    .then((latestStat) => {
      const today = new Date();
      const lastDate = new Date(latestStat.createdAt);
      const timeDiff = lastDate.getTime() - today.getTime();
      // const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      // changed from 1 day to less to account for time to parse/save
      const diffDays = Math.ceil(timeDiff / (1000 * 3000 * 24));
      if (diffDays <= -1) {
        console.log('*************** was yesterday or greater');
      }
      return diffDays <= -1;
    });

module.exports = { checkSnapshot };
