const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
  TorrentStats,
} = require('../../db/models');

const safeFields = {
  fields: ['seed', 'leach', 'uploadDate', 'uploadUser', 'size', 'hash', 'url', 'torrentListingId'],
};

const getSiteCount = () => TorrentSite.count();
const getScrapeCount = () => TorrentStats.count();
const getInfoCount = () => TorrentInfo.count();
const getListCount = () => TorrentListing.count();
const getGroupCount = () => TorrentGroup.count();
const getSnapshotCount = () => TorrentSnapshot.count();
const getTorrentCount = () => TorrentListing.count();

const getOrMakeSite = siteObj =>
  TorrentSite.findOrCreate({
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
      return listing.getInfos({ include: [{ as: 'Group', model: TorrentGroup }] });
    })
    .then((infos) => {
      let foundGroupInfo = false;
      let foundInfo = false;
      infos.forEach((info) => {
        if (
          info.uploadDate === torrentScrapeObj.uploadDate &&
          info.uploadUser === torrentScrapeObj.uploadUser
        ) {
          foundInfo = info;
        }
        info.Group.forEach((group) => {
          if (group.id === torrentScrapeObj.torrentGroupId) {
            foundGroupInfo = info;
            newTorrentObj.torrentInfoId = info.id;
          }
        });
      });

      if (foundGroupInfo) return foundGroupInfo.updateAttributes(newTorrentObj);

      if (foundInfo && !foundGroupInfo) return foundInfo.addGroup(torrentScrapeObj.torrentGroupId);

      console.log(
        torrentScrapeObj.torrentSiteId,
        ' | ',
        torrentScrapeObj.name,
        'not found! creating info',
      );
      return TorrentInfo.create(newTorrentObj, safeFields).then((createdInfo) => {
        createdInfo.addGroup(torrentScrapeObj.torrentGroupId);
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
module.exports = {
  getOrMakeSite,
  getOrMakeTorrentListing,
  getSnapshotCount,
  getTorrentCount,
  getGroupCount,
  getInfoCount,
  getListCount,
  getScrapeCount,
  getSiteCount,
};
