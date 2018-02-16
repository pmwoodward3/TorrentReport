const Sequelize = require('sequelize');
const TorrentInfo = require('./torrentInfo');
const TorrentGroup = require('./torrentGroup');
const TorrentSnapshot = require('./torrentSnapshot');
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
            include: [TorrentSnapshot, TorrentGroup],
          },
        ],
      },
      withSites: {
        include: [
          {
            model: TorrentInfo,
            as: 'Infos',
            include: [
              { model: TorrentSnapshot },
              {
                as: 'Group',
                model: TorrentGroup,
                include: [TorrentSite],
              },
            ],
          },
        ],
      },
    },
  },
);

module.exports = TorrentListing;
