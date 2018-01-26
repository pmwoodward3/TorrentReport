const rarbg = [
  {
    name: 'RARBG',
    group: 'top100movies',
    resourceDomain: 'rarbg.to',
    webPage:
      'https://rarbg.to/top100.php?category%5B%5D=14&category%5B%5D=48&category%5B%5D=17&category%5B%5D=44&category%5B%5D=45&category%5B%5D=47&category%5B%5D=50&category%5B%5D=51&category%5B%5D=52&category%5B%5D=42&category%5B%5D=46&category%5B%5D=49',
    selectors: [
      {
        label: 'name',
        query:
          'body > table:nth-child(6) > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > a:nth-child(1)',
        pluck: function(data) {
          return { name: data.outerText, url: data.href }
        }
      },
      {
        label: 'uploaded',
        query: '.lista2 > td:nth-child(3)',
        pluck: function(data) {
          return data.outerText
        }
      },
      {
        label: 'size',
        query: '.lista2 > td:nth-child(4)',
        pluck: function(data) {
          return data.outerText
        }
      },
      {
        label: 'seed',
        query: '.lista2 > td:nth-child(5)',
        pluck: function(data) {
          return data.outerText
        }
      },
      {
        label: 'leach',
        query: '.lista2 > td:nth-child(6)',
        pluck: function(data) {
          return data.outerText
        }
      },
      {
        label: 'uploader',
        query: '.lista2 > td:nth-child(9)',
        pluck: function(data) {
          return data.outerText
        }
      }
    ],
    resultCombiner: (rawResults, selectors) => {
      const groupedArr = []
      // comb through the series of arrays and pull the same index from each one.
      for (var resInd = 0; resInd < rawResults[0].length; resInd++) {
        let newObj = {}
        selectors.forEach((selector, index) => {
          let originalValue = rawResults[index][resInd]
          if (index === 0) {
            newObj['name'] = originalValue.name
            newObj['url'] = originalValue.url
          } else if (index === 1) {
            newObj['uploaded'] = new Date(originalValue)
          } else {
            newObj[selector.label] = originalValue
          }
        })
        groupedArr.push(newObj)
      }

      return groupedArr
    }
  }
]

module.exports = rarbg
