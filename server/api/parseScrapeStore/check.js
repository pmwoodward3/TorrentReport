const { TorrentStats } = require('../../db/models');

const maxIdDetail = () => TorrentStats.max('id').then(maxId => TorrentStats.findById(maxId));

const checkSnapshot = async () => {
  const isActive = await TorrentStats.findOne({ where: { active: true } }).then(result => result != null);
  const isNotFresh = await maxIdDetail().then((latestStat) => {
    const today = new Date();
    const lastDate = new Date(latestStat.endedAt);
    const timeDiff = lastDate.getTime() - today.getTime();
    const diffDays = timeDiff / (1000 * 3600 * 22);

    console.log('#### LAST SCRAPE WAS MORE THAN 22 HOURS AGO #### ', diffDays <= -1);
    return diffDays <= -1;
  });
  return !isActive && isNotFresh;
};

module.exports = { checkSnapshot, maxIdDetail };
