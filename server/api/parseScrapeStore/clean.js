const _ = require('lodash');

const clean = (fullSitesArr, statId) => {
  let itemArr = [];
  fullSitesArr.forEach((site) => {
    console.log('site group length', site.groups.length);
    site.groups.forEach((group) => {
      console.log('group result length', group.results.length);
      itemArr = itemArr.concat(group.results);
    });
  });

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
