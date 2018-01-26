const rarbg = [
  {
    name: '1337X',
    group: 'top100movies',
    resourceDomain: '1337x.to',
    webPage: 'http://1337x.to/top-100-movies',
    selectors: [
      {
        label: 'name',
        query: 'div.featured-list > div > table > tbody > tr > td:nth-child(1)',
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
          switch (selector.label) {
            case 'name':
              newObj['name'] = originalValue.name
              newObj['url'] = originalValue.url
              break
            case 'uploaded':
              newObj['uploaded'] = new Date(originalValue)
              break
            default:
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
