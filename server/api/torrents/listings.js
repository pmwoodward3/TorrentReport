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

router.get('/addinfos', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  let listingObj;
  let newInfoObj;
  TorrentListing.findOrCreate({
    where: {
      name: 'Braven 2018 720p WEB-DL DD5 1 H264-FGT',
    },
  })
    .spread((listing, created) => {
      listingObj = listing;
      return listing.getInfos();
    })
    .then(infos => res.json(infos));

  // .then((infos) => {
  //   if(inf)
  //   TorrentInfo.create({
  //   uploadDate: new Date(),
  //   uploadUser: 'some fake users',
  //   size: '4.20 GB',
  //   hash: '0123456789101112',
  //   url: 'fakelink.com',
  //   torrentGroupId: 1,
  //   torrentListingId: listing.id,
  // })})
  // .then((newInfo) => {
  //   newInfoObj = newInfo;
  //   return listingObj.addInfo(newInfo);
  // })
  // .then(infos => res.json(infos))
  // .catch(next);

  // } else {
  //   next()
  // }
});
