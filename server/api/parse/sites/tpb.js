const tpb = [
  {
    name: 'tpb',
    group: 'top100movies',
    resourceDomain: 'thepiratebay.org',
    webPage: 'https://thepiratebay.org/top/200',
    selectors: [
      {
        label: 'name',
        query: '#searchResult > tbody > tr > td:nth-child(2) > div > a',
        pluck: function(data) {
          return { name: data.outerText, url: data.href }
        }
      },
      {
        label: 'uploaded',
        query: '#searchResult > tbody > tr > td:nth-child(2) > .detDesc',
        pluck: function(data) {
          return data.outerText
        }
      },
      {
        label: 'seed',
        query: '#searchResult > tbody > tr > td:nth-child(3)',
        pluck: function(data) {
          return data.outerText
        }
      },
      {
        label: 'leach',
        query: '#searchResult > tbody > tr > td:nth-child(4)',
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
          let original = rawResults[index][resInd]
          if (index === 0) {
            newObj['name'] = original.name
            newObj['url'] = original.url
          } else if (index === 1) {
            const tpbRegEx = /.*Uploaded\s+(.*),\sSize\s+(.*),\sULed by\s+(.*).*/
            const infoArr = tpbRegEx.exec(original)
            newObj['uploaded'] = infoArr[1]
            newObj['size'] = infoArr[2].replace('GiB', 'GB')
            newObj['uploader'] = infoArr[3]
          } else {
            newObj[selector.label] = original
          }
        })
        groupedArr.push(newObj)
      }

      return groupedArr
    }
  }
]

module.exports = tpb
