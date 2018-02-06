const router = require('express').Router();
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  TorrentListing.scope('withSites')
    .findAll()
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});
