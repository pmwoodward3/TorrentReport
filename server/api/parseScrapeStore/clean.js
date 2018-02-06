const _ = require('lodash');

const clean = (fullSitesArr) => {
  let itemArr = [];
  fullSitesArr.forEach((site) => {
    console.log('site group length', site.groups.length);
    site.groups.forEach((group) => {
      console.log('group result length', group.results.length);
      itemArr = itemArr.concat(group.results);
    });
  });

  console.log(' &&&&&&&&&&&&&&&& ITEM ARR LENGTH', itemArr.length);

  const keysToKeepArr = ['torrentInfoId', 'seed', 'leach'];
  const cleanSnapshotArr = itemArr.map((snapshot) => {
    const newObj = _.pick(snapshot, keysToKeepArr);
    newObj.date = new Date();
    return newObj;
  });
  return cleanSnapshotArr;
};

module.exports = { clean };
