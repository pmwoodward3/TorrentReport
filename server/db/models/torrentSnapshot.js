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
  leach: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = TorrentSnapshot;
