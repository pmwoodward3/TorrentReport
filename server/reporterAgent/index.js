require('babel-polyfill');
const sitesArray = require('./sites/index');
const safeToRunAgent = require('./utils/safeToRunAgent');
const scrapeSite = require('./scrape');

function reporterAgent() {
  let holdVar;
  return new Promise((reporterResolve, reporterReject) => {
    let hold3var;
    safeToRunAgent()
      .then((isSafe) => {
        if (!isSafe) throw Error('not safe to run agent');
        // start snapshot obj
        // return: pass sites to siteScraperObj
        return isSafe;
      })
      .catch(rej => reporterReject(rej.message))
      .then(res => reporterResolve(res));
  });
}

module.exports = reporterAgent;
