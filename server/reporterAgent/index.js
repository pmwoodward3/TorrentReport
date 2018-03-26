require('babel-polyfill');
const sitesArray = require('./sites/index');
const safeToRunAgent = require('./utils/safeToRunAgent');
const scrapeSite = require('./scrape');
const { initStat, closeStat } = require('./utils/stats');

function reporterAgent(inputSiteArr = sitesArray) {
  let holdVar;
  return new Promise((reporterResolve, reporterReject) => {
    let hold3var;
    return safeToRunAgent()
      .then((isSafe) => {
        if (!isSafe) throw Error('not safe to run agent');
      })
      .then(initStat)
      .then(_ => scrapeSite(inputSiteArr))
      .then(_ => closeStat({}))
      .then(reporterResolve)
      .catch(reporterReject);
  });
}

module.exports = reporterAgent;
