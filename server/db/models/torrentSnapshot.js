const Sequelize = require('sequelize');
const db = require('../db');

const TorrentSnapshot = db.define('torrentSnapshot', {
  date: {
    type: Sequelize.DATE,
  },
  seed: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  leech: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = TorrentSnapshot;
