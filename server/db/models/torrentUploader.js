const Sequelize = require('sequelize');
const TorrentInfo = require('./torrentInfo');
const TorrentSite = require('./torrentSite');
const db = require('../db');

const TorrentUploader = db.define(
  'torrentUploader',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lowerCaseName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    scopes: {
      withInfos: {
        include: [TorrentInfo, TorrentSite],
      },
      withSites: {
        include: [{ as: 'Site', through: 'SiteUploader', model: TorrentSite }],
      },
    },
  },
);

module.exports = TorrentUploader;
