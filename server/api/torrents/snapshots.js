const router = require('express').Router();
const moment = require('moment');
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentCategory,
  TorrentGroup,
} = require('../../db/models');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = router;

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
router.get('/top/week/:order/:limit', (req, res, next) => {
  let { order } = req.params;
  if (!order || !['seed', 'leech', 'both'].includes(order)) {
    order = 'seed';
  }

  let limit = req.params.limit ? parseInt(req.params.limit, 10) : 5;
  if (limit > 100) limit = 100;
  const now = new Date();
  const withinWeek = moment(now).subtract(1, 'week');

  let both;
  if (order === 'both') {
    both = true;
    order = 'seed';
  }
  const result = {
    seed: [],
    leech: [],
  };

  findWeeklyTopSnapshots(order, limit, withinWeek)
    .then((data) => {
      if (!both) return Promise.resolve(data);
      result.seed = data;
      return findWeeklyTopSnapshots('leech', limit, withinWeek);
    })
    .then((data) => {
      if (!both) return Promise.resolve(data);
      result.leech = data;
      return Promise.resolve(result);
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return next();
    })
    .then(data => res.json(data));
  // .catch(next);
});

const findWeeklyTopSnapshots = (order, limit, withinWeek) =>
  TorrentSnapshot.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(withinWeek),
      },
    },
    order: [[order, 'DESC']],
    include: [
      {
        model: TorrentInfo,
        include: [TorrentListing, { as: 'Group', model: TorrentGroup, include: [TorrentSite] }],
      },
    ],
  }).then((data) => {
    const seenInfoId = {};
    data.forEach((snapshot) => {
      const currentInfoId = seenInfoId[snapshot.torrentInfoId];
      if (!currentInfoId || snapshot[order] > currentInfoId[order]) {
        seenInfoId[snapshot.torrentInfoId] = snapshot;
      }
    });
    const keys = Object.keys(seenInfoId);
    const arr = keys.map(id => seenInfoId[id]);
    const sorted = arr.sort((a, b) => b[order] - a[order]);
    return Promise.resolve(sorted.slice(0, limit));
  });
