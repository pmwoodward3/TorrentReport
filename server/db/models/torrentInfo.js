const Sequelize = require('sequelize');
const { TorrentSite, TorrentListing, TorrentGroup } = require('./index');
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
    leach: {
      type: Sequelize.INTEGER,
    },
    maxSeed: {
      type: Sequelize.INTEGER,
    },
    maxSeedDate: {
      type: Sequelize.DATE,
    },
    maxLeach: {
      type: Sequelize.INTEGER,
    },
    maxLeachDate: {
      type: Sequelize.DATE,
    },
    minSeed: {
      type: Sequelize.INTEGER,
    },
    minSeedDate: {
      type: Sequelize.DATE,
    },
    minLeach: {
      type: Sequelize.INTEGER,
    },
    minLeachDate: {
      type: Sequelize.DATE,
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
