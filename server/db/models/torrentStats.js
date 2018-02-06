const Sequelize = require('sequelize');

const db = require('../db');

const TorrentStats = db.define('torrentStats', {
  siteCount: {
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
  active: {
    type: Sequelize.BOOLEAN,
  },
  endedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = TorrentStats;
