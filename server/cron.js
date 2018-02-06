const { CronJob } = require('cron');
const pSS = require('./api/parseScrapeStore');

const scraper = new CronJob(
  '00 06 23 * * *',
  () => {
    console.log('starting');
    pSS();
  },
  () => {
    console.log('stop');
    /* This function is executed when the job stops */
  },
  false /* Start the job right now */,
  'America/New_York' /* Time zone of this job. */,
);

module.exports = { scraper };
