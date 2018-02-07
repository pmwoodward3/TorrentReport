const Sequelize = require('sequelize');

const db = require('../db');

const TorrentStats = db.define('torrentStats', {
  scrapeCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  siteCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  siteLoadCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  torrentCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  torrentLoadCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  groupCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  listingCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  infoCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  snapshotCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  endedAt: {
    type: Sequelize.DATE,
    defaultValue: 0,
  },
});

module.exports = TorrentStats;
