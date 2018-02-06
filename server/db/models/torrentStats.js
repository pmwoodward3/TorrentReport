const Sequelize = require('sequelize');

const db = require('../db');

const TorrentStats = db.define('torrentStats', {
  sitesCount: {
    type: Sequelize.INTEGER,
  },
  torrentCount: {
    type: Sequelize.INTEGER,
  },
  groupCount: {
    type: Sequelize.INTEGER,
  },
  snapshotCount: {
    type: Sequelize.INTEGER,
  },
});

module.exports = TorrentStats;
