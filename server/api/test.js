const router = require('express').Router();
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
  TorrentStats,
} = require('../db/models');
const pSS = require('./parseScrapeStore');
const reporterAgent = require('../reporterAgent');

module.exports = router;

router.get('/', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  pSS()
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});
router.get('/new', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  reporterAgent()
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});

router.get('/redo', (req, res, next) => {
  TorrentStats.findOne({ where: { active: true } }).then(result => res.send(result));
});
