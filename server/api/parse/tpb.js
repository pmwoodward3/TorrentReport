const puppeteer = require('puppeteer')

let scrape = async () => {
  const userAgent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A'
  var browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()
  page.setUserAgent(userAgent)
  await page.goto(
    'https://www.wunderground.com/weather/us/ny/new-york-city/10036'
  )
  await page.waitFor(3000)
  const result = await page.evaluate(() => {
    let title = document.querySelector(
      '#inner-content > div.city-body > div.row.current-forecast > div > div:nth-child(1) > div.small-12.medium-6.columns.city-conditions-column > div > city-current-conditions > div > div.conditions-circle-wrap.small-4.medium-7.columns.text-center > div > div > div.current-temp > display-unit > span > span.wu-value.wu-value-to'
    ).innerText
    return title
  })
  browser.close()
  return result
}

module.exports = scrape
