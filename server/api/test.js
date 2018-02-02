const router = require('express').Router();
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../db/models');
const pSS = require('./parseScrapeStore');
const scrape = require('./parseScrapeStore/scrape');
const rarbg = require('./parseScrapeStore/sites/rarbg');

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

router.get('/scrape', (req, res, next) => {
  const results = [];
  rarbg.groups.forEach((group) => {
    results.push(scrape(group));
  });
  Promise.all(results)
    .then(results => res.json(results))
    .catch(next);
});
