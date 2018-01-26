const Sequelize = require('sequelize')
const db = require('../db')

const TorrentListing = db.define('torrentListing', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  uploadDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  uploadUser: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.STRING
  },
  hash: {
    type: Sequelize.STRING,
    unique: true
  },
  url: {
    type: Sequelize.STRING
  }
})

module.exports = TorrentListing
