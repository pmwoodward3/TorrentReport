const router = require('express').Router();
const sequelize = require('sequelize');
const { checkSnapshot } = require('../parseScrapeStore/check');
const { TorrentStats } = require('../../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  checkSnapshot()
    .then(data => res.json(data))
    .catch(next);
  // TorrentStats.max('id')
  //   .then(maxId => TorrentStats.findById(maxId))
  //   .then(data => res.json(data))
  //   .catch(next);
  // } else {
  //   next()
  // }
});
router.get('/a', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  TorrentStats.findOne({ where: { active: true } })
    .then(data => res.json(data))
    .catch(next);
  // TorrentStats.max('id')
  //   .then(maxId => TorrentStats.findById(maxId))
  //   .then(data => res.json(data))
  //   .catch(next);
  // } else {
  //   next()
  // }
});
