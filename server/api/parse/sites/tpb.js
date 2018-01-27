const tpb = [
  {
    name: 'TPB',
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
        label: 'category',
        query: '#searchResult > tbody > tr > td:nth-child(1)',
        pluck: function(data) {
          return data.outerText
        }
      },
      {
        label: 'magnet',
        query: '#searchResult > tbody > tr > td:nth-child(2) > a:nth-child(2)',
        pluck: function(data) {
          return data.href
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
      console.log('inside of TPB result combiner')
      console.log(
        'res length',
        rawResults.length,
        'selector length',
        selectors.length
      )
      const groupedArr = []
      // comb through the series of arrays and pull the same index from each one.
      for (var resInd = 0; resInd < rawResults[0].length; resInd++) {
        if (!rawResults[0].length) break
        let newObj = {}
        selectors.forEach((selector, index) => {
          let original = rawResults[index][resInd]
          switch (selector.label) {
            case 'name':
              newObj['name'] = original.name
              newObj['url'] = original.url
              break
            case 'magnet':
              newObj['magnet'] = original
              let re1 = '.*?' // Non-greedy match on filler
              let re2 = '((?:[a-z][a-z]*[0-9]+[a-z0-9]*))' // Alphanum 1
              let p = new RegExp(re1 + re2, ['i'])
              let m = p.exec(original)
              newObj['hash'] = m[1]
              break
            case 'category':
              newObj['category'] = original.replace(/\n/g, ' ').trim()
              break
            case 'uploaded':
              const infoArr = /.*Uploaded\s+(.*),\sSize\s+(.*),\sULed by\s+(.*).*/.exec(
                original
              )
              const spaceRegEx = /(.*)\s(.*)/
              const hyphenRegEx = /(.*)-(.*)/
              const colonRegEx = /(.*):(.*)/

              const uploadedDate = infoArr[1]
              let upMonthDateHourMinute = uploadedDate.split(spaceRegEx)
              upMonthDateHourMinute.splice(0, 1)
              upMonthDateHourMinute.splice(2, 1)
              let upMonthDate = upMonthDateHourMinute[0].split(hyphenRegEx)
              upMonthDate.splice(0, 1)
              upMonthDate.splice(2, 1)
              // JS date is 0 based so -1
              let upMonth = upMonthDate[0] - 1
              let upDate = upMonthDate[1]
              let upHourMinute = upMonthDateHourMinute[1].split(colonRegEx)
              upHourMinute.splice(0, 1)
              upHourMinute.splice(2, 1)
              let upHour = upHourMinute[0]
              let upMinute = upHourMinute[1]
              let newUploadDate
              if (upMonthDateHourMinute[0] === 'Y-day') {
                newUploadDate = new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() - 1,
                  upHour,
                  upMinute
                )
              } else if (upMonthDateHourMinute[0] === 'Today') {
                newUploadDate = new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate(),
                  upHour,
                  upMinute
                )
              } else if (upMonthDateHourMinute[1].includes(':')) {
                newUploadDate = new Date(
                  new Date().getFullYear(),
                  upMonth,
                  upDate,
                  upHour,
                  upMinute
                )
              } else {
                newUploadDate = new Date(
                  upMonthDateHourMinute[1],
                  upMonth,
                  upDate,
                  0,
                  0
                )
              }
              newObj['uploaded'] = newUploadDate
              newObj['size'] = infoArr[2]
                .replace('GiB', 'GB')
                .replace('MiB', 'MB')
              newObj['uploader'] = infoArr[3]
              break
            default:
              newObj[selector.label] = original
              break
          }
        })
        groupedArr.push(newObj)
      }

      return groupedArr
    }
  }
]

module.exports = tpb
