const router = require('express').Router();
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../db/models');
const scrape = require('./parse');

module.exports = router;

router.get('/', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  scrape()
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});

router.get('/db', (req, res, next) => {});
