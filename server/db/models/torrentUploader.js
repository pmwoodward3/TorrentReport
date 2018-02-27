const Sequelize = require('sequelize');
const TorrentInfo = require('./torrentInfo');
const TorrentSite = require('./torrentSite');
const db = require('../db');

const TorrentUploader = db.define(
  'torrentUploader',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    count: {
      type: Sequelize.INTEGER,
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
