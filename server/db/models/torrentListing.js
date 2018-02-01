const Sequelize = require('sequelize');
const TorrentInfo = require('./torrentInfo');
const TorrentGroup = require('./torrentGroup');
const TorrentSite = require('./torrentSite');
const db = require('../db');

const TorrentListing = db.define(
  'torrentListing',
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    scopes: {
      withInfos: {
        include: [
          {
            model: TorrentInfo,
            as: 'Infos',
          },
        ],
      },
      withGroups: {
        include: [
          {
            model: TorrentInfo,
            as: 'Infos',
            include: [TorrentGroup],
          },
        ],
      },
      withSites: {
        include: [
          {
            model: TorrentInfo,
            as: 'Infos',
            include: [{ model: TorrentGroup, include: [TorrentSite] }],
          },
        ],
      },
    },
  },
);

module.exports = TorrentListing;
