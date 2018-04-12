/* eslint-disable no-unused-vars */
require('babel-polyfill'); // fix for tests
const sitesArray = require('./sites/index');
const safeToRunAgent = require('./utils/safeToRunAgent');
const scrapeSite = require('./scrape');
const { initStat, closeStat } = require('./fetchOrMake/stats');
const getOrMakeNestedSite = require('./fetchOrMake/siteGroupCategory');
const sequentialPromise = require('./utils/sequentialPromise');
const filterSkip = require('./utils/filterSkip');

function reporterAgent(inputSiteArr = sitesArray, skipSafetyCheck = false) {
  return new Promise((reporterResolve, reporterReject) => {
    let hold3var;
    return safeToRunAgent()
      .then((isSafe) => {
        if (!isSafe && !skipSafetyCheck) throw Error('not safe to run agent');
        else {
          return initStat()
            .then(_ => sequentialPromise(inputSiteArr, getOrMakeNestedSite))
            .then(filterSkip)
            .then(siteArrWithIds => sequentialPromise(siteArrWithIds, scrapeSite))
            .then(closeStat);
        }
      })
      .then(reporterResolve)
      .catch(reporterReject);
  });
}

module.exports = reporterAgent;
