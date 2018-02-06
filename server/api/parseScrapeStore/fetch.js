const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
  TorrentStats,
} = require('../../db/models');

const safeFields = {
  fields: [
    'seed',
    'leach',
    'uploadDate',
    'uploadUser',
    'size',
    'hash',
    'url',
    'torrentGroupId',
    'torrentListingId',
  ],
};

const getSnapshotCount = () =>
  TorrentSnapshot.count().then((data) => {
    console.log('torrent snapshots:', data);
    return data;
  });

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
      siteObj.groups.map((group) => {
        group.siteId = site.id;
        return group;
      });
      return siteObj;
    })
    .then(async (site) => {
      console.log(site.siteName, '- now creating or finding groups...');
      const newGroups = await Promise.all(site.groups.map(group =>
        TorrentGroup.findOrCreate({
          where: {
            url: group.webPage,
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
  let dbListingObj;
  console.log(
    torrentScrapeObj.torrentSiteId,
    ' | ',
    torrentScrapeObj.name,
    'checking torrent if exists/create ::: ',
  );
  return TorrentListing.findOrCreate({
    where: {
      name: torrentScrapeObj.name,
    },
  })
    .spread((listing, created) => {
      console.log(torrentScrapeObj.torrentSiteId, ' | ', listing.name, 'was created?', created);
      newTorrentObj.torrentListingId = listing.id;
      dbListingObj = listing;
      return listing.getInfos({ include: [{ model: TorrentGroup }] });
    })
    .then((infos) => {
      let found = false;
      infos.forEach((info) => {
        if (info.torrentGroup.torrentSiteId === torrentScrapeObj.torrentSiteId) {
          // torrent site found
          console.log(
            torrentScrapeObj.torrentSiteId,
            ' | ',
            torrentScrapeObj.name,
            'already exists for this site',
          );
          newTorrentObj.torrentInfoId = info.id;
          found = info;
        }
      });
      if (found) return found.updateAttributes(newTorrentObj);
      console.log(
        torrentScrapeObj.torrentSiteId,
        ' | ',
        torrentScrapeObj.name,
        'not found! creating info',
      );
      return TorrentInfo.create(newTorrentObj, safeFields).then((createdInfo) => {
        newTorrentObj.torrentInfoId = createdInfo.id;
        console.log(
          torrentScrapeObj.torrentSiteId,
          ' | ',
          torrentScrapeObj.name,
          'created info item assc',
        );
        return dbListingObj.addInfo(createdInfo);
      });
    })
    .then(_ => newTorrentObj);
};
module.exports = { getOrMakeSite, getOrMakeTorrentListing, getSnapshotCount };
