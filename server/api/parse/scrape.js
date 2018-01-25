const puppeteer = require('puppeteer')
var STORE_ARR

const scrape = async ({ resourceDomain, webPage, selectors, evalFunc }) => {
  console.log('entering scrape...')

  var browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A'
  )
  await page.setViewport({ width: 1300, height: 1300 })
  await page.setRequestInterception(true)
  page.on('request', filterRequests)
  await page.goto(webPage, {
    timeout: 100000
  })
  await page.waitFor(3000)
  let result = await page.evaluate(evalFunc, selectors)
  browser.close()
  return result
}

const filterRequests = interceptedRequest => {
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
    interceptedRequest.abort()
  } else {
    // console.log('ALLOWING resource ->', interceptedRequest.url())
    interceptedRequest.continue()
  }
}

module.exports = scrape
