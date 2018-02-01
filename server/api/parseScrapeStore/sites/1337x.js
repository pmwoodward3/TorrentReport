const rarbg = {
  siteName: '1337X',
  siteShortName: '1337X',
  siteUrl: 'https://thepiratebay.org/',
  groups: [
    {
      groupName: 'TOP100MOVIES',
      groupTag: 'top100Movies',
      resourceDomain: '1337x.to',
      webPage: 'http://1337x.to/top-100-movies',
      selectors: [
        {
          label: 'name',
          query: 'div.featured-list > div > table > tbody > tr > td:nth-child(1)',
          pluck(data) {
            return { name: data.outerText, url: data.href };
          },
        },
        {
          label: 'uploaded',
          query: '.lista2 > td:nth-child(3)',
          pluck(data) {
            return data.outerText;
          },
        },
        {
          label: 'size',
          query: '.lista2 > td:nth-child(4)',
          pluck(data) {
            return data.outerText;
          },
        },
        {
          label: 'seed',
          query: '.lista2 > td:nth-child(5)',
          pluck(data) {
            return data.outerText;
          },
        },
        {
          label: 'leach',
          query: '.lista2 > td:nth-child(6)',
          pluck(data) {
            return data.outerText;
          },
        },
        {
          label: 'uploader',
          query: '.lista2 > td:nth-child(9)',
          pluck(data) {
            return data.outerText;
          },
        },
      ],
      resultCombiner: (rawResults, selectors) => {
        const groupedArr = [];
        // comb through the series of arrays and pull the same index from each one.
        for (var resInd = 0; resInd < rawResults[0].length; resInd++) {
          const newObj = {};
          selectors.forEach((selector, index) => {
            const originalValue = rawResults[index][resInd];
            switch (selector.label) {
              case 'name':
                newObj.name = originalValue.name;
                newObj.url = originalValue.url;
                break;
              case 'uploaded':
                newObj.uploaded = new Date(originalValue);
                break;
              default:
                newObj[selector.label] = originalValue;
            }
          });
          groupedArr.push(newObj);
        }

        return groupedArr;
      },
    },
  ],
};

module.exports = rarbg;
