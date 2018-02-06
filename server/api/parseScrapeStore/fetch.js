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
          found = true;
        }
      });
      if (found) {
        return infos;
      }
      console.log(
        torrentScrapeObj.torrentSiteId,
        ' | ',
        torrentScrapeObj.name,
        'not found! creating info',
      );
      return TorrentInfo.create(newTorrentObj, {
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
module.exports = { getOrMakeSite, getOrMakeTorrentListing };
