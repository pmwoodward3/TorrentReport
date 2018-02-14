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

router.get('/', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  TorrentSnapshot.findAll()
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});

router.get('/new/top/:days/:order', (req, res, next) => {
  if (!req.params.order || !['seed', 'leach'].includes(req.params.order)) req.params.order = 'seed';
  if (!req.params.days) req.params.days = 1;
  const days = parseInt(req.params.days, 10);
  if (days > 31) res.sendStatus(403);
  const filterTime = new Date() - days * 24 * 60 * 60 * 1000;
  TorrentSnapshot.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(filterTime),
      },
    },
    limit: 100,
    order: [[req.params.order, 'DESC']],
    include: [
      {
        model: TorrentInfo,
        include: [{ as: 'Group', model: TorrentGroup, include: [TorrentSite] }],
      },
    ],
  })
    .then(data => res.json(data))
    .catch(next);
});

router.get('/new/:days', (req, res, next) => {
  if (!req.params.days) req.params.days = 1;
  const days = parseInt(req.params.days, 10);
  if (days > 31) res.sendStatus(403);
  const filterTime = new Date() - days * 24 * 60 * 60 * 1000;
  // if (req.user && req.user.isAdmin) {
  TorrentSnapshot.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(filterTime),
      },
    },
    include: [
      {
        model: TorrentInfo,
        include: [{ as: 'Group', model: TorrentGroup, include: [TorrentSite] }],
      },
    ],
  })
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});

router.get('/alltime/top/:order', (req, res, next) => {
  if (!req.params.order || !['seed', 'leach'].includes(req.params.order)) req.params.order = 'seed';

  TorrentSnapshot.findAll({
    limit: 100,
    order: [[req.params.order, 'DESC']],
    include: [
      {
        model: TorrentInfo,
        include: [TorrentListing, { as: 'Group', model: TorrentGroup, include: [TorrentSite] }],
      },
    ],
  })
    .then(data => res.json(data))
    .catch(next);
});
