const puppeteer = require('puppeteer')
var STORE_ARR

const scrape = async ({ resourceDomain, webPage, selectors }) => {
  console.log('entering scrape...')
  STORE_ARR = selectors

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
  page.on('request', interceptedRequest => {
    if (
      !interceptedRequest.url().includes(resourceDomain) ||
      interceptedRequest.url().endsWith('.png') ||
      interceptedRequest.url().endsWith('.jpg') ||
      interceptedRequest.url().endsWith('.mp3') ||
      interceptedRequest.url().endsWith('.css') ||
      interceptedRequest.url().endsWith('.mp4') ||
      interceptedRequest.url().endsWith('.gif')
    ) {
      console.log('blocking resource ->', interceptedRequest.url())
      interceptedRequest.abort()
    } else {
      console.log('ALLOWING resource ->', interceptedRequest.url())
      interceptedRequest.continue()
    }
  })
  await page.goto(webPage, {
    timeout: 100000
  })
  console.log('start wait')
  await page.waitFor(3000)
  console.log('end wait')
  const result = await page.evaluate(selectors => {
    // console.log('selector --->', selectors)
    // console.log('hello from evaluate')
    var results = document.querySelectorAll(
      'body > table:nth-child(6) > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > a:nth-child(1)'
    )
    results = Array.from(results).map(result => {
      return result.outerText
    })
    return results
    // selectors.forEach(selector => {
    // results.push(document.querySelectorAll(selector))
    // // })
    // return Array.from(results).map(elem => {
    //   return elem.outerText
    // })
  }, selectors)
  console.log('selectors -->', selectors)
  console.log('results ==>', result)
  browser.close()
  return result
}

module.exports = scrape
