var request = require('request'),
  cheerio = require('cheerio'),
  url =
    'http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=' +
    02888,
  result

request(url, function(error, response, body) {
  if (!error) {
    var $ = cheerio.load(body),
      temperature = $("[data-variable='temperature'] .wx-value").html()
    result = temperature
    console.log('It’s ' + temperature + ' degrees Fahrenheit.')
  } else {
    result = error
    console.log('We’ve encountered an error: ' + error)
  }
})

const tpb = function() {
  return {
    wedid: result
  }
}

module.exports = tpb
