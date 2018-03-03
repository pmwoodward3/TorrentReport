const { TorrentStats } = require('../../db/models');

const initStat = () =>
  TorrentStats.create({
    active: true,
  });

module.exports = {
  initStat,
};
