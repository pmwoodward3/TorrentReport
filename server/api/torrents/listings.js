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
  const newInfoObj = {
    id: 2,
    uploadDate: '2018-02-05T05:37:22.272Z',
    uploadUser: 'PROGR',
    size: '233333.4 GB',
    hash: '000000000',
    url: 'https://hellno.site',
    torrentGroupId: 3,
    torrentListingId: 3,
  };
  TorrentListing.findOrCreate({
    where: {
      name: 'Fake Movie 2017 1080p',
    },
  })
    .spread((listing, created) => {
      listingObj = listing;
      return listing.getInfos({ include: [{ model: TorrentGroup }] });
    })
    .then((infos) => {
      let found = false;
      infos.forEach((info) => {
        if (info.torrentGroup.torrentSiteId === 3) {
          // torrent site found
          console.log('already exists for this site');
          found = true;
        }
      });
      if (found) {
        return infos;
      }
      console.log('not found! creating info');
      return TorrentInfo.create(newInfoObj, {
        fields: [
          'uploadDate',
          'uploadUser',
          'size',
          'hash',
          'url',
          'torrentGroupId',
          'torrentListingId',
        ],
      }).then((createdInfo) => {
        console.log('created info item assc');
        return listingObj.addInfo(createdInfo);
      });
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
