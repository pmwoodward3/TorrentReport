const puppeteer = require('puppeteer')

let scrape = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const browser = await puppeteer.launch({ headless: true })
  } else {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  }
  const page = await browser.newPage()
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
