const TorrentStats = require('../../db/models/torrentStats');

/** @description Condition for unsafe: current active stat object in database
 * or last scrape started less than 22 hours ago.
 * @returns {boolean} Returns true or false whether it is safe to run agent.
 * */
const safeToRunAgent = () =>
  // check if an active stat agent is running
  TorrentStats.findOne({ where: { active: true } })
    .then((result) => {
      if (result && result.active) return false;
      // check if enough time has elapsed since last scrape
      return TorrentStats.max('id')
        .then((maxId) => {
          if (!maxId) return true;
          return TorrentStats.findById(maxId).then((latestStat) => {
            const today = new Date();
            const lastDate = new Date(latestStat.createdAt);
            const timeDiff = today.getTime() - lastDate.getTime();
            const diff = 1000 * 3600 * 11;
            const diffDays = timeDiff / diff;
            return diffDays >= 1;
          });
        })
        .catch((err) => {
          console.log('safe to run agent error', err);
          return false;
        });
    })
    .catch(err => true); // eslint-disable-line

module.exports = safeToRunAgent;
