const router = require('express').Router();
const { TorrentStats } = require('./db/models');
const reporterAgent = require('./reporterAgent');

module.exports = router;

router.get('/', (req, res, next) => {
  reporterAgent()
    .then(data => res.json(data))
    .catch(next);
});

router.get('/redo', (req, res, next) => {
  TorrentStats.findOne({ where: { active: true } }).then(result => res.send(result).catch(next));
});
