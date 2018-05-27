const router = require('express').Router();
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../../db/models');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = router;

// this is for testing purposes.
// no need to ever fetch ALL snapshots
// router.get('/', (req, res, next) => {
//   TorrentSnapshot.findAll()
//     .then(data => res.json(data))
//     .catch(next);
// });

// return all the snapshots for a specific infoID
router.get('/:infoId', (req, res, next) => {
  if (!req.params.infoId || !Number.isInteger(parseInt(req.params.infoId, 10))) {
    return res.sendStatus(404);
  }
  const id = parseInt(req.params.infoId, 10);
  return TorrentSnapshot.findAll({
    include: [{ model: TorrentInfo, where: { id } }],
  })
    .then(data => res.json(data))
    .catch(next);
});

// new snapshots grouped by torrentinfo Id from the past X days
// this is a love note to my evachka
router.get('/new/:days', (req, res, next) => {
  if (!req.params.days) req.params.days = 1;
  const days = parseInt(req.params.days, 10);
  if (days > 31) res.sendStatus(403);
  const d = days * 24 * 60 * 60 * 1000;
  const filterTime = new Date() - d;
  TorrentSnapshot.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(filterTime),
      },
    },
    include: [
      {
        model: TorrentInfo,
        group: 'id',
        include: [
          { model: TorrentListing },
          { as: 'Group', model: TorrentGroup, include: [{ model: TorrentSite }] },
        ],
      },
    ],
  })
    .then((data) => {
      const seenInfoIds = new Set();
      return data.filter((snapshot) => {
        if (seenInfoIds.has(snapshot.torrentInfoId)) return false;
        seenInfoIds.add(snapshot.torrentInfoId);
        return true;
      });
    })
    .then(data => res.json(data))
    .catch(next);
});

// new snapshots from specific site for past X days
router.get('/new/:days/site/:siteId', (req, res, next) => {
  if (!req.params.days) req.params.days = 1;
  if (!req.params.siteId) return res.sendStatus(404);
  const id = parseInt(req.params.siteId, 10);
  const days = parseInt(req.params.days, 10);
  if (days > 31) res.sendStatus(403);
  const d = days * 24 * 60 * 60 * 1000;
  const filterTime = new Date() - d;
  return TorrentSnapshot.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(filterTime),
      },
    },
    include: [
      {
        model: TorrentInfo,
        group: 'id',
        include: [
          { model: TorrentListing },
          { as: 'Group', model: TorrentGroup, include: [{ model: TorrentSite, where: { id } }] },
        ],
      },
    ],
  })
    .then(data => res.json(data))
    .catch(next);
});

// need to test this. limit might be before query completion?
router.get('/alltime/top/:order', (req, res, next) => {
  if (!req.params.order || !['seed', 'leech'].includes(req.params.order)) req.params.order = 'seed';

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
