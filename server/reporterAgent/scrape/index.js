const { RALogger } = require('../../logging');
const sequentialPromise = require('../utils/sequentialPromise');
const scrape = require('./scrape');
const filterSkip = require('../utils/filterSkip');

const scrapeSite = (siteObj) => {
  const newSiteObj = Object.assign({}, siteObj);
  return sequentialPromise(siteObj.groups, scrape) // min 1 min delay between scrape runs
    .then((groupScraped) => {
      newSiteObj.groups = groupScraped;
      RALogger.verbose(`++++created ${newSiteObj.groups.length} groups`);
      return newSiteObj;
    })
    .catch((err) => {
      RALogger.error('! error in scrape site !');
      RALogger.error(newSiteObj);
      RALogger.error(err);
      return { skip: true };
    });
};

module.exports = scrapeSite;
