const { RALogger } = require('../../logging');
const getOrMakeTorrentListing = require('../fetchOrMake/torrentListing');
const addOrSetUser = require('../fetchOrMake/torrentUser');

const cleanCheckSave = (resultCleaner, listingCheck, listObj) => {
  const cleanObject = resultCleaner(listObj);
  const shouldSkip = listingCheck(cleanObject);
  let lastResult;
  if (!shouldSkip) {
    return getOrMakeTorrentListing(cleanObject)
      .then((newListing) => {
        lastResult = Object.assign({}, newListing);
        return newListing;
      })
      .then(addOrSetUser)
      .then(() => lastResult)
      .catch((err) => {
        RALogger.error(' !!!!!!!!! error in cleanCheckSave');
        RALogger.error('listObj:');
        RALogger.error(listObj);
        RALogger.error(err);
        return { skip: true };
      });
  }
  return { skip: true };
};

module.exports = cleanCheckSave;
