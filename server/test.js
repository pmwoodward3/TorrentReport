const router = require('express').Router();
const reporterAgent = require('./reporterAgent');
const scraperss = require('./reporterAgent/scrape/rss');
const scrapesite = require('./reporterAgent/scrape/puppet');
const yts = require('./reporterAgent/sites/yts');
const tpb = require('./reporterAgent/sites/tpb');

module.exports = router;

// router.get('/', (req, res, next) => {   reporterAgent()     .then(data =>
// res.json(data))     .catch(next); });

router.get('/scraperss', (req, res, next) => {
  scraperss(yts.groups[0])
    .then(data => res.json(data))
    .catch(next);
});

router.get('/scrapesite', (req, res, next) => {
  scrapesite(tpb.groups[0])
    .then(data => res.json(data))
    .catch(next);
});
