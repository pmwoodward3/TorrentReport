const router = require('express').Router();
const reporterAgent = require('./reporterAgent');
const scrape = require('./reporterAgent/scrape/rss');
const yts = require('./reporterAgent/sites/yts');

module.exports = router;

router.get('/', (req, res, next) => {
  reporterAgent()
    .then(data => res.json(data))
    .catch(next);
});

router.get('/scraperss', (req, res, next) => {
  scrape(yts.groups[0])
    .then(data => res.json(data))
    .catch(next);
});
