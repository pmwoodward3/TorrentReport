const Sequelize = require('sequelize');
const {
  TorrentSite, TorrentListing, TorrentGroup, TorrentSnapshot,
} = require('./index');
const db = require('../db');

const TorrentInfo = db.define(
  'torrentInfo',
  {
    uploadDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    imdb: {
      type: Sequelize.STRING,
    },
    seed: {
      type: Sequelize.INTEGER,
    },
    leech: {
      type: Sequelize.INTEGER,
    },
    maxSeed: {
      type: Sequelize.INTEGER,
    },
    maxSeedDate: {
      type: Sequelize.DATE,
    },
    maxLeech: {
      type: Sequelize.INTEGER,
    },
    maxLeechDate: {
      type: Sequelize.DATE,
    },
    minSeed: {
      type: Sequelize.INTEGER,
    },
    minSeedDate: {
      type: Sequelize.DATE,
    },
    minLeech: {
      type: Sequelize.INTEGER,
    },
    minLeechDate: {
      type: Sequelize.DATE,
    },
    ratio: {
      type: Sequelize.DOUBLE,
    },
    minRatio: {
      type: Sequelize.DOUBLE,
    },
    minRatioDate: {
      type: Sequelize.DATE,
    },
    maxRatio: {
      type: Sequelize.DOUBLE,
    },
    maxRatioDate: {
      type: Sequelize.DATE,
    },
    category: {
      type: Sequelize.STRING,
    },
    uploadUser: {
      type: Sequelize.STRING,
    },
    size: {
      type: Sequelize.STRING,
    },
    hash: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
  },
  {
    scopes: {
      details: {
        include: [],
      },
    },
  },
);

module.exports = TorrentInfo;
