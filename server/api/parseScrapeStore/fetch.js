const { sendError } = require('../../notifier/email/emails');

const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
  TorrentStats,
  TorrentCategory,
  TorrentUploader,
} = require('../../db/models');

const safeFields = {
  fields: [
    'torrentCategoryId',
    'torrentUploaderId',
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
    'ratio',
    'minRatio',
    'minRatioDate',
    'maxRatio',
    'maxRatioDate',
    'hash',
    'uploadDate',
    'uploadUser',
    'size',
    'category',
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
        }).spread(async (groupObj, created) => {
          console.log(site.siteName, '- group: ', groupObj.name, 'was created:', created);
          group.groupId = groupObj.id;
          return group;
        })));

      for (let i = 0; i < newGroups.length; i++) {
        const currItem = Object.assign({}, newGroups[i]);
        const id = await TorrentCategory.findOrCreate({
          where: {
            name: currItem.type,
          },
        }).spread((categoryObj, created) => {
          console.log(site.siteName, '- category: ', categoryObj.name, 'was created:', created);
          return categoryObj.id;
        });
        currItem.typeId = id;
        newGroups[i] = currItem;
      }

      console.log(site.siteName, '- assigning new group arr with above info...');
      site.groups = newGroups;
      return site;
    });

const getOrMakeTorrentListing = (torrentScrapeObj) => {
  const newTorrentObj = Object.assign({}, torrentScrapeObj);
  let dbListingObj;
  console.log(
    'site id:',
    torrentScrapeObj.torrentSiteId,
    ' | group id:',
    torrentScrapeObj.torrentGroupId,
    ' | type id:',
    torrentScrapeObj.typeId,
    ' | torrent listing name:',
    torrentScrapeObj.name,
  );
  return TorrentListing.findOrCreate({
    where: {
      name: torrentScrapeObj.name,
    },
  })
    .spread((listing, created) => {
      console.log('... was created?', created);
      newTorrentObj.torrentListingId = listing.id;
      dbListingObj = listing;
      return listing.getInfos({
        include: [
          { as: 'Group', model: TorrentGroup },
          { model: TorrentUploader },
          { as: 'Category', through: 'InfoCategory', model: TorrentCategory },
        ],
      });
    })
    .then((infos) => {
      let foundGroupInfo = false;
      let foundInfo = false;
      let foundCategory = false;
      infos.forEach((info) => {
        // check if current torrent uplaod user is already in our db.
        if (info.uploadUser === torrentScrapeObj.uploadUser) {
          foundInfo = info;
          console.log('... did find curr uploaduser in info!!!!');
          console.log(
            '... info uploaduser',
            info.uploadUser,
            'obj uplaoduser',
            torrentScrapeObj.uploadUser,
          );
          newTorrentObj.torrentInfoId = parseInt(info.id, 10);
        }

        // check if group already found
        info.Group.forEach((group) => {
          if (parseInt(group.id, 10) === parseInt(torrentScrapeObj.torrentGroupId, 10)) {
            foundGroupInfo = info;
            console.log('... group already exists in existing info ', foundGroupInfo == false);
            console.log(
              '... info group id',
              group.id,
              'obj group id',
              torrentScrapeObj.torrentGroupId,
            );
          }
        });
        console.log('info ', info);
        console.log('info cate', info.Category);
        // check if category is linked to info
        if (Array.isArray(info.Category)) {
          info.Category.forEach((category) => {
            if (parseInt(category.id, 10) === parseInt(torrentScrapeObj.typeId, 10)) {
              console.log('... found category linked to info already');
              foundCategory = info;
            }
          });
        }
      });

      const rawRatio = newTorrentObj.seed / newTorrentObj.leach;
      newTorrentObj.ratio = Math.floor(rawRatio * 100) / 100;

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
        if (newTorrentObj.ratio < foundInfo.minRatio) {
          newTorrentObj.minRatio = newTorrentObj.ratio;
          newTorrentObj.minRatioDate = nowDateObj;
        }
        if (newTorrentObj.ratio > foundInfo.minRatio) {
          newTorrentObj.maxRatio = newTorrentObj.ratio;
          newTorrentObj.maxRatioDate = nowDateObj;
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
        newTorrentObj.minRatio = newTorrentObj.ratio;
        newTorrentObj.minRatioDate = nowDateObj;
        newTorrentObj.maxRatio = newTorrentObj.ratio;
        newTorrentObj.maxRatioDate = nowDateObj;
      }

      if (!foundGroupInfo && foundInfo) {
        console.log('... DID NOT FIND GROUP BUT FOUND INFO, update info add group');
        return foundInfo
          .updateAttributes(newTorrentObj)
          .then(updatedObj => updatedObj.addGroup(torrentScrapeObj.torrentGroupId))
          .then((updatedObj) => {
            console.log(
              '... inside of did not find group after addgroup updatedObj ->',
              updatedObj,
            );
            if (!foundCategory) return foundInfo.addCategory(torrentScrapeObj.typeId);
            return updatedObj;
          });
      }
      if (foundGroupInfo && foundInfo) {
        console.log('.. FOUND GROUP AND INFO, just update');
        return foundInfo.updateAttributes(newTorrentObj).then((updatedObj) => {
          if (!foundCategory) return updatedObj.addCategory(torrentScrapeObj.typeId);
          return updatedObj;
        });
      }

      // true Group true Info,
      console.log('... creating info');
      return TorrentInfo.create(newTorrentObj, safeFields).then((createdInfo) => {
        createdInfo.addGroup(torrentScrapeObj.torrentGroupId);
        createdInfo.addCategory(torrentScrapeObj.typeId);
        newTorrentObj.torrentInfoId = createdInfo.id;
        console.log('... created info item and association ');
        return dbListingObj.addInfo(createdInfo);
      });
    })
    .then(_ => newTorrentObj);
};

const addOrSetUser = (listingObj) => {
  console.log('listing obj in add or set user==>', listingObj);
  return TorrentUploader.findOrCreate({
    where: { name: listingObj.uploadUser },
  })
    .spread(async (uploaderObj, created) => {
      // console.log('torrentUploaderId:', uploaderObj.id);
      // console.log('uploaderObj AddSiteUploader:', listingObj.torrentSiteId);
      await TorrentInfo.findById(listingObj.torrentInfoId).then(infoObj =>
        infoObj.update({ torrentUploaderId: uploaderObj.id }));
      console.log(' uploaderObj   ----  >>>>>', uploaderObj);
      return uploaderObj.addTorrentSite(listingObj.torrentSiteId);
    })
    .catch(err => sendError(`error in add or set user ${addOrSetUser}`));
};

module.exports = {
  addOrSetUser,
  getOrMakeSite,
  getOrMakeTorrentListing,
  getSnapshotCount,
  getTorrentCount,
  getGroupCount,
  getInfoCount,
  getScrapeCount,
  getSiteCount,
};
