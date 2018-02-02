const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../../db/models');

const getOrMakeSite = (siteObj) => {
  console.log(siteObj.siteName, '- working on site ');
  return TorrentSite.findOrCreate({
    where: {
      name: siteObj.siteName,
      short: siteObj.siteShortName,
      url: siteObj.siteUrl,
    },
  })
    .spread((site, created) => {
      console.log(site.name, '- was created:', created);
      siteObj.siteId = site.id;
      return siteObj;
    })
    .then(async (site) => {
      console.log(site.siteName, '- now creating or finding groups...');
      const newGroups = await Promise.all(site.groups.map(group =>
        TorrentGroup.findOrCreate({
          where: {
            name: group.groupName,
            tag: group.groupTag,
            torrentSiteId: site.siteId,
          },
        }).spread((groupObj, created) => {
          console.log(site.siteName, '- group: ', groupObj.name, 'was created:', created);
          group.groupId = groupObj.id;
          return group;
        })));
      console.log(site.siteName, '- assigning new group arr with info...');
      site.groups = newGroups;
      return site;
    });
};

const getOrMakeTorrentListing = (torrentScrapeObj) => {
  const newTorrentObj = Object.assign({}, torrentScrapeObj);
  console.log('checking torrent if exists/create ::: ', torrentScrapeObj.name);
  return TorrentListing.findOrCreate({
    where: {
      name: torrentScrapeObj.name,
    },
  })
    .spread((listing, created) => {
      console.log(listing.name, 'was created?', created);
      return listing;
    })
    .then((listingObj) => {
      newTorrentObj.torrentListingId = listingObj.id;
      return newTorrentObj;
    });
};
module.exports = { getOrMakeSite, getOrMakeTorrentListing };
