const router = require('express').Router();
const { maxIdDetail } = require('../parseScrapeStore/check');
const { TorrentStats } = require('../../db/models');
const {
  getOrMakeSite,
  getSnapshotCount,
  getTorrentCount,
  getGroupCount,
  getInfoCount,
  getListCount,
  getScrapeCount,
  getSiteCount,
} = require('../parseScrapeStore/fetch');

module.exports = router;

router.get('/', (req, res, next) => {
  maxIdDetail()
    .then(data => res.json(data))
    .catch(next);
});

router.get('/active', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    TorrentStats.findOne({ where: { active: true } })
      .then(data => res.json(data))
      .catch(next);
  } else {
    next();
  }
});
