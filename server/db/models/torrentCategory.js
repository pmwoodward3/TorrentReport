const Sequelize = require('sequelize');
const TorrentInfo = require('./torrentInfo');
const db = require('../db');

const TorrentCategory = db.define(
  'torrentCategory',
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
        include: [TorrentInfo],
      },
    },
  },
);

module.exports = TorrentCategory;
