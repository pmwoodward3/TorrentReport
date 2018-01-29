const Sequelize = require('sequelize');
const db = require('../db');

const TorrentListing = db.define('torrentListing', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = TorrentListing;
