const puppeteer = require('puppeteer');
const { getOrMakeTorrentListing } = require('./fetch');

const pageConsole = (msg) => {
  console.log('PAGE LOG:', msg.text());
};

const minimumArrLength = (smallest, currentVal) => {
  const currValLen = currentVal.length;
  const isSmaller = currValLen < smallest;
  return isSmaller ? currValLen : smallest;
};

const scrape = async ({
  groupId,
  groupName,
  groupTag,
  resourceDomain,
  webPage,
  selectors,
  resultCleaner,
}) => {
  console.log(`start scrape | groupName: ${groupName} | rD: ${resourceDomain} | selC: ${selectors.length}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A');
  await page.setViewport({ width: 1300, height: 1000 });
  await page.setRequestInterception(true);
  page.on('console', pageConsole);
  page.on('request', (interceptedRequest) => {
    if (
      !interceptedRequest.url().includes(resourceDomain) ||
      interceptedRequest.url().endsWith('.ico') ||
      interceptedRequest.url().endsWith('.png') ||
      interceptedRequest.url().endsWith('.jpg') ||
      interceptedRequest.url().endsWith('.mp3') ||
      interceptedRequest.url().endsWith('.css') ||
      interceptedRequest.url().endsWith('.swf') ||
      interceptedRequest.url().endsWith('.mp4') ||
      interceptedRequest.url().endsWith('.gif')
    ) {
      interceptedRequest.abort();
    } else {
      interceptedRequest.continue();
    }
  });
  await page.goto(webPage, {
    timeout: 100000,
  });
  await page.waitFor(3000);

  const pageEvalFunc = (results, pluck) =>
    results.map((result) => {
      const resObj = {};
      const pluckKeys = Object.keys(pluck);
      pluckKeys.forEach((key) => {
        resObj[key] = result[pluck[key]];
      });
      return resObj;
    });

  const results = await Promise.all(selectors.map(selector => page.$$eval(selector.query, pageEvalFunc, selector.pluck)));
  browser.close();

  // lowest length of selector results should be used as limit
  const selectLimit = results.reduce(minimumArrLength, results[0].length);

  const groupedResults = [];

  for (let i = 0; i < selectLimit; i += 1) {
    const combinedSelector = {};
    results.forEach((result) => {
      // get each result at current index
      const resKeys = Object.keys(result[i]);
      resKeys.forEach((key) => {
        combinedSelector[key] = result[i][key];
      });
    });
    combinedSelector.torrentGroupId = groupId;
    const cleanResult = resultCleaner(combinedSelector);
    const torrentListing = await getOrMakeTorrentListing(cleanResult);
    groupedResults.push(torrentListing);
  }

  return {
    groupId,
    groupName,
    groupTag,
    resourceDomain,
    webPage,
    results: groupedResults,
  };
};

module.exports = scrape;
