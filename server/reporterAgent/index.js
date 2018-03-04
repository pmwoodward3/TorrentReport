require('babel-polyfill');
const Promise = require('bluebird');
const sitesArray = require('./sites/index');
const safeToRunAgent = require('./utils/safeToRunAgent');

function reporterAgent() {
  safeToRunAgent()
    .then((isSafe) => {
      if (!isSafe) return Error('not safe to run agent');
      // start snapshot obj
      // return: pass sites to siteScraperObj
      return isSafe;
    })
    .then(finalresult =>
      // return finish snapshot obj
      finalresult);
}

module.exports = reporterAgent;
