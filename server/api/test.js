const router = require('express').Router();
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../db/models');
const pSS = require('./parseScrapeStore');

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
