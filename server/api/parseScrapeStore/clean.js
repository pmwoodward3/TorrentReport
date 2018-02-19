const _ = require('lodash');

const removeDuplicates = (snapshotArr) => {
  const lookUpObj = {};
  const newSnapshotArr = [];
  snapshotArr.forEach((snapshot) => {
    if (!lookUpObj[snapshot.torrentInfoId]) {
      // first time seeing this snapshot, lets add it.
      newSnapshotArr.push(snapshot);
      lookUpObj[snapshot.torrentInfoId] = true;
    } else console.log(`duplicate snapshot found for infoId: ${snapshot.torrentInfoId}`);
  });
  return newSnapshotArr;
};

const clean = (fullSitesArr, statId) => {
  let itemArr = [];
  fullSitesArr.forEach((site, id) => {
    console.log(`${id} - ${site.siteName} - ${site.groups.length} group(s)`);
    site.groups.forEach((group, id) => {
      console.log(`\t - (${id}) ${group.groupName} - ${group.groupTag} - ${group.results.length} item(s)`);
      itemArr = itemArr.concat(group.results);
    });
  });

  itemArr = removeDuplicates(itemArr);

  const keysToKeepArr = ['torrentInfoId', 'seed', 'leach', 'torrentStatId'];
  const cleanSnapshotArr = itemArr.map((snapshot) => {
    const newObj = _.pick(snapshot, keysToKeepArr);
    newObj.date = new Date();
    newObj.torrentStatId = statId;
    return newObj;
  });
  return cleanSnapshotArr;
};

module.exports = { clean };
