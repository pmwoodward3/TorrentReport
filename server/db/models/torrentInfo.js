const Sequelize = require('sequelize');
const db = require('../db');

const TorrentInfo = db.define('torrentInfo', {
  uploadDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  uploadUser: {
    type: Sequelize.STRING,
  },
  size: {
    type: Sequelize.STRING,
  },
  hash: {
    type: Sequelize.STRING,
    unique: true,
  },
  url: {
    type: Sequelize.STRING,
  },
});

module.exports = TorrentInfo;
