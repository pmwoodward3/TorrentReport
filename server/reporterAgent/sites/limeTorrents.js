const moment = require('moment');
const { universalClean } = require('./utils');

// eslint-disable-next-line
const listingCheck = cleanListingObj => false;

const resultCleaner = (rawResult) => {
  const newResult = Object.assign({}, rawResult);
  const resKeys = Object.keys(rawResult);
  resKeys.forEach((key) => {
    switch (key) {
      case 'downloadLink': {
        newResult.hash = magnetCleanup(rawResult.downloadLink);
        break;
      }
      case 'uploaded': {
        newResult.uploadDate = uploadedCleanup(rawResult.uploaded);
        break;
      }
      default: {
        newResult[key] = universalClean(key, rawResult[key]);
        break;
      }
    }
  });
  newResult.uploadUser = 'Not Reported To Torrent Report';
  return newResult;
};

const tpb = {
  siteName: 'Lime Torrents',
  siteShortName: 'Lime',
  siteUrl: 'https://www.limetorrents.cc',
  groups: [
    {
      type: 'MOVIES',
      groupName: 'MOVIES',
      groupTag: 'Top 100 MOVIES',
      resourceDomain: 'limetorrents.cc',
      webPage: 'https://www.limetorrents.cc/cat_top/16/Movies/',
      selectors: [
        {
          label: 'download',
          query: '#content > table > tbody > tr > td.tdleft > div.tt-name > a.csprite_dl14',
          pluck: { downloadLink: 'href' },
        },
        {
          label: 'name',
          query: '#content > table > tbody > tr > td.tdleft > div.tt-name > a:nth-child(2)',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploaded',
          query: '#content > table > tbody > tr > td:nth-child(2)',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query: '#content > table > tbody > tr > td.tdseed',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '#content > table > tbody > tr > td.tdleech',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'health',
          query: '#content > table > tbody > tr > td.tdright > div',
          pluck: { healthClass: 'className' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Top 100 TV',
      resourceDomain: 'limetorrents.cc',
      webPage: 'https://www.limetorrents.cc/cat_top/20/TV%20-%20shows/',
      selectors: [
        {
          label: 'download',
          query: '#content > table > tbody > tr > td.tdleft > div.tt-name > a.csprite_dl14',
          pluck: { downloadLink: 'href' },
        },
        {
          label: 'name',
          query: '#content > table > tbody > tr > td.tdleft > div.tt-name > a:nth-child(2)',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploaded',
          query: '#content > table > tbody > tr > td:nth-child(2)',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query: '#content > table > tbody > tr > td.tdseed',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '#content > table > tbody > tr > td.tdleech',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'health',
          query: '#content > table > tbody > tr > td.tdright > div',
          pluck: { healthClass: 'className' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'MUSIC',
      groupName: 'MUSIC',
      groupTag: 'Top 100 MUSIC',
      resourceDomain: 'limetorrents.cc',
      webPage: 'https://www.limetorrents.cc/cat_top/17/Music/',
      selectors: [
        {
          label: 'download',
          query: '#content > table > tbody > tr > td.tdleft > div.tt-name > a.csprite_dl14',
          pluck: { downloadLink: 'href' },
        },
        {
          label: 'name',
          query: '#content > table > tbody > tr > td.tdleft > div.tt-name > a:nth-child(2)',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploaded',
          query: '#content > table > tbody > tr > td:nth-child(2)',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query: '#content > table > tbody > tr > td.tdseed',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '#content > table > tbody > tr > td.tdleech',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'health',
          query: '#content > table > tbody > tr > td.tdright > div',
          pluck: { healthClass: 'className' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
  ],
};

const magnetCleanup = magnetURI => magnetURI.slice(30, magnetURI.indexOf('.torrent?'));

const uploadedCleanup = (uploadedString) => {
  /*    POSSIBLE DATE STRINGS
    right now
    2 days ago
    Yesterday
    27 minutes ago
    1 hour ago
    6 hours ago
    1 Year+
    Last Month
    2 months ago
  */
  let finalUploadDate;
  if (uploadedString.includes('days ago')) {
    // 2 days ago
    const now = new Date();
    const removeIndex = uploadedString.indexOf(' days ago');
    const xDaysAgo = uploadedString.slice(0, removeIndex);
    finalUploadDate = moment(now).subtract(xDaysAgo, 'days');
  } else if (uploadedString.includes('right now')) {
    // right now
    const now = new Date();
    finalUploadDate = moment(now);
  } else if (uploadedString.includes('Yesterday')) {
    // Yesterday
    const now = new Date();
    finalUploadDate = moment(now).subtract(1, 'days');
  } else if (uploadedString.includes('minutes ago')) {
    // 27 minutes ago
    const now = new Date();
    const removeIndex = uploadedString.indexOf(' minutes ago');
    const xMinutesAgo = uploadedString.slice(0, removeIndex);
    finalUploadDate = moment(now).subtract(xMinutesAgo, 'minutes');
  } else if (uploadedString.includes('hour ago')) {
    // 1 hour ago
    const now = new Date();
    finalUploadDate = moment(now).subtract(1, 'hours');
  } else if (uploadedString.includes('hours ago')) {
    // 6 hours ago
    const now = new Date();
    const removeIndex = uploadedString.indexOf(' hours ago');
    const xHoursAgo = uploadedString.slice(0, removeIndex);
    finalUploadDate = moment(now).subtract(xHoursAgo, 'hours');
  } else if (uploadedString.includes('1 Year+')) {
    // 1 Year+
    const now = new Date();
    const removeIndex = uploadedString.indexOf(' Year+');
    const xYearsAgo = uploadedString.slice(0, removeIndex);
    finalUploadDate = moment(now).subtract(xYearsAgo, 'years');
  } else if (uploadedString.includes('Last Month')) {
    // Last Month
    const now = new Date();
    finalUploadDate = moment(now).subtract(1, 'months');
  } else if (uploadedString.includes('months ago')) {
    // Last Month
    const now = new Date();
    const removeIndex = uploadedString.indexOf(' months ago');
    const xMonthsAgo = uploadedString.slice(0, removeIndex);
    finalUploadDate = moment(now).subtract(xMonthsAgo, 'months');
  }
  return new Date(finalUploadDate);
};

module.exports = tpb;
