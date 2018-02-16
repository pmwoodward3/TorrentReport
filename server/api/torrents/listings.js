const router = require('express').Router();
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../../db/models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = router;

router.get('/:id', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  TorrentListing.scope('withSites')
    .findById(parseInt(req.params.id, 10))
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});

router.get('/new/:days', (req, res, next) => {
  if (!req.params.days) req.params.days = 1;
  const days = parseInt(req.params.days, 10);
  if (days > 31) res.sendStatus(403);
  const filterTime = new Date() - days * 24 * 60 * 60 * 1000;

  TorrentListing.scope('withSites')
    .findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(filterTime),
        },
      },
      order: [['createdAt', 'DESC']],
    })
    .then(data => res.json(data))
    .catch(next);
});

router.get('/a', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  TorrentListing.findById(1)
    .then(listing => listing.getInfos())
    // .findAll()
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});
