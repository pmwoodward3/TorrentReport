const rssParser = require('rss-parser');
const { RALogger } = require('../../logging');
const sequentialPromise = require('../utils/sequentialPromise');

const parser = new rssParser();

const rssScrape = ({
  typeId,
  groupId,
  siteId,
  groupName,
  groupTag,
  resourceDomain,
  webPage,
  selectors,
  resultCleaner,
  listingCheck,
  collectItems,
  proccessItem,
}) => {
  RALogger.verbose(`start RSS scrape | groupName: ${groupName} | resourceDomain: ${resourceDomain}`);
  return parser
    .parseURL(webPage)
    .then(collectItems)
    .then(itemsArr => sequentialPromise(itemsArr, proccessItem));
};

module.exports = rssScrape;
