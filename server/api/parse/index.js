const scrape = require('./scrape')

const sites = [
  {
    name: 'rarbg',
    resourceDomain: 'rarbg.to',
    webPage:
      'https://rarbg.to/top100.php?category%5B%5D=14&category%5B%5D=48&category%5B%5D=17&category%5B%5D=44&category%5B%5D=45&category%5B%5D=47&category%5B%5D=50&category%5B%5D=51&category%5B%5D=52&category%5B%5D=42&category%5B%5D=46&category%5B%5D=49',
    selectors: [
      {
        label: 'name',
        query:
          'body > table:nth-child(6) > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > a:nth-child(1)'
      },
      {
        label: 'uploaded',
        query: '.lista2 > td:nth-child(3)'
      },
      {
        label: 'size',
        query: '.lista2 > td:nth-child(4)'
      },
      {
        label: 'seed',
        query: '.lista2 > td:nth-child(5)'
      },
      {
        label: 'leach',
        query: '.lista2 > td:nth-child(6)'
      },
      {
        label: 'uploader',
        query: '.lista2 > td:nth-child(9)'
      }
    ],
    evalFunc: selectorsArray => {
      let results = []
      selectorsArray.forEach(selector => {
        results.push(Array.from(document.querySelectorAll(selector.query)))
      })
      results = results.map((querySelectArr, index) => {
        return querySelectArr.map(rawResult => {
          console.log(rawResult)
          return rawResult.outerText
        })
      })
      const groupedArr = []
      for (var resInd = 0; resInd < results[0].length; resInd++) {
        let newObj = {}
        selectorsArray.forEach((selector, index) => {
          newObj[selector.label] = results[index][resInd]
        })
        groupedArr.push(newObj)
      }

      return groupedArr
    }
  }
]

let fetch = sites => {
  const sitesArr = sites.map(site => {
    return scrape(site)
  })
  return Promise.all(sitesArr)
}

fetch = fetch.bind(null, sites)

module.exports = fetch
