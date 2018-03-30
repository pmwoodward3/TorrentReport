const siteData = [
  {
    siteName: 'test fullname',
    siteShortName: 'Test',
    siteUrl: 'http://google.com',
    siteId: 1,
    id: 1,
    groups: [
      {
        type: 'MOVIES',
        siteId: 1,
        groupName: 'MOVIES',
        groupTag: 'top100Movies',
        resourceDomain: 'http://google.com',
        webPage: 'http://google.com',
        url: 'http://google.com',
        selectors: [
          {
            label: 'name',
            query: 'body > a:nth-child(1)',
            pluck: { name: 'outerText', url: 'href' },
          },
        ],
        results: [
          {
            seed: 1,
            leach: 1,
            torrentInfoId: 1,
          },
        ],
      },
    ],
  },
];
module.exports = { siteData };
