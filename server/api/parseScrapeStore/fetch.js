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
    'imdb',
    'seed',
    'minSeed',
    'minSeedDate',
    'maxSeed',
    'maxSeedDate',
    'leach',
    'minLeach',
    'minLeachDate',
    'maxLeach',
    'maxLeachDate',
    'hash',
    'uploadDate',
    'uploadUser',
    'size',
    'url',
    'torrentListingId',
  ],
};

const getSiteCount = () => TorrentSite.count();
const getScrapeCount = () => TorrentStats.count();
const getInfoCount = () => TorrentInfo.count();
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
    '===============',
    torrentScrapeObj.torrentSiteId,
    ' | ',
    torrentScrapeObj.torrentGroupId,
    ' | ',
    torrentScrapeObj.name,
  );
  return TorrentListing.findOrCreate({
    where: {
      name: torrentScrapeObj.name,
    },
  })
    .spread((listing, created) => {
      console.log('was created?', created);
      newTorrentObj.torrentListingId = listing.id;
      dbListingObj = listing;
      return listing.getInfos({ include: [{ as: 'Group', model: TorrentGroup }] });
    })
    .then((infos) => {
      let foundGroupInfo = false;
      let foundInfo = false;
      infos.forEach((info) => {
        if (info.uploadUser === torrentScrapeObj.uploadUser) {
          foundInfo = info;
          console.log('did find curr uploaduser in info!!!!');
          console.log(
            'info uploaduser',
            info.uploadUser,
            'obj uplaoduser',
            torrentScrapeObj.uploadUser,
          );
        }
        info.Group.forEach((group) => {
          if (parseInt(group.id, 10) === parseInt(torrentScrapeObj.torrentGroupId, 10)) {
            foundGroupInfo = info;
            newTorrentObj.torrentInfoId = parseInt(group.id, 10);
            console.log('did find obj group in listing info!!!!', foundGroupInfo == false);
            console.log('info group id', group.id, 'obj group id', torrentScrapeObj.torrentGroupId);
          }
        });
      });

      // newTorrentObj needs max and min setup
      // compare new min and max to existing
      const nowDateObj = new Date();
      if (foundInfo) {
        if (newTorrentObj.seed > foundInfo.maxSeed) {
          newTorrentObj.maxSeed = newTorrentObj.seed;
          newTorrentObj.maxSeedDate = nowDateObj;
        }
        if (newTorrentObj.seed < foundInfo.minSeed) {
          newTorrentObj.minSeed = newTorrentObj.seed;
          newTorrentObj.minSeedDate = nowDateObj;
        }
        if (newTorrentObj.leach > foundInfo.maxLeach) {
          newTorrentObj.maxLeach = newTorrentObj.leach;
          newTorrentObj.maxLeachDate = nowDateObj;
        }
        if (newTorrentObj.leach < foundInfo.minLeach) {
          newTorrentObj.minLeach = newTorrentObj.leach;
          newTorrentObj.minLeachDate = nowDateObj;
        }
      } else {
        // its a newly found torrent init the max and min
        newTorrentObj.maxSeed = newTorrentObj.seed;
        newTorrentObj.maxSeedDate = nowDateObj;
        newTorrentObj.maxLeach = newTorrentObj.leach;
        newTorrentObj.maxLeachDate = nowDateObj;
        newTorrentObj.minSeed = newTorrentObj.seed;
        newTorrentObj.minSeedDate = nowDateObj;
        newTorrentObj.minLeach = newTorrentObj.leach;
        newTorrentObj.minLeachDate = nowDateObj;
      }

      if (!foundGroupInfo && foundInfo) {
        console.log('DID NOT FIND GROUP BUT FOUND INFO, update info add group');
        return foundInfo
          .updateAttributes(newTorrentObj)
          .then(updatedObj => updatedObj.addGroup(torrentScrapeObj.torrentGroupId));
      }
      if (foundGroupInfo && foundInfo) {
        console.log('FOUND GROUP AND INFO, just update');
        return foundInfo.updateAttributes(newTorrentObj);
      }

      // true Group true Info,
      console.log('creating info...................');
      return TorrentInfo.create(newTorrentObj, safeFields).then((createdInfo) => {
        createdInfo.addGroup(torrentScrapeObj.torrentGroupId);
        newTorrentObj.torrentInfoId = createdInfo.id;
        console.log('.................created info item assc');
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
  getScrapeCount,
  getSiteCount,
};
