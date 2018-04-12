const { RALogger } = require('../../logging');
const sequentialPromise = require('../utils/sequentialPromise');
const scrape = require('./puppet');
const filterSkip = require('../utils/filterSkip');

const scrapeSite = siteObj =>
  new Promise((scrapeResolve, scrapeReject) => {
    const newSiteObj = Object.assign({}, siteObj);
    sequentialPromise(siteObj.groups, scrape, 90000) // 1.5min delay between scrape runs
      .then((groupScraped) => {
        const groupsToKeep = filterSkip(groupScraped);
        newSiteObj.groups = groupsToKeep;
        RALogger.verbose(`++++created ${newSiteObj.groups.length} groups`);
        scrapeResolve(newSiteObj);
      })
      .catch((err) => {
        RALogger.error('! error in scrape site !');
        RALogger.error(err);
        scrapeReject(err);
      });
  });

module.exports = scrapeSite;
