// require babel polyfill for testing purposes
require('babel-polyfill');

const puppeteer = require('puppeteer');

const scrape = async ({
  name, group, resourceDomain, webPage, selectors, resultCombiner,
}) => {
  console.log('entering scrape...');
  console.log('--name', name);
  console.log('--group', group);
  console.log('--resourceDomain', resourceDomain);
  console.log('--selectors count', selectors.length);

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
      // console.log('blocking resource ->', interceptedRequest.url())
      interceptedRequest.abort();
    } else {
      // console.log('ALLOWING resource ->', interceptedRequest.url())
      interceptedRequest.continue();
    }
  });
  await page.goto(webPage, {
    timeout: 100000,
  });
  await page.waitFor(3000);
  const results = [];

  // this will loop through the selectors
  for (let selectorInd = 0; selectorInd < selectors.length; selectorInd++) {
    // get ElementHandle by queryStatementAll for selector query
    let selectResults = await page.$$(selectors[selectorInd].query);
    selectResults = Array.from(selectResults);
    // now loop through the results of the query (an array of ElementHandles)
    for (let itemIndex = 0; itemIndex < selectResults.length; itemIndex++) {
      // evaluate handle using pluck function and store value
      selectResults[itemIndex] = await page.evaluate(
        selectors[selectorInd].pluck,
        selectResults[itemIndex],
      );
    }
    results.push(selectResults);
  }
  browser.close();
  const finalObject = {
    name,
    group,
    webPage,
    date: new Date(),
    results: resultCombiner(results, selectors),
  };
  return finalObject;
};

const pageConsole = (msg) => {
  console.log('PAGE LOG:', msg.text());
};

module.exports = scrape;
