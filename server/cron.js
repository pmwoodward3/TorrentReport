const { CronJob } = require('cron');
const pSS = require('./api/parseScrapeStore');
const { sendError } = require('./notifier/email/emails');

const scraper = new CronJob(
  '00 38 01 * * *',
  () => {
    console.log('starting');
    pSS().catch(err => sendError('automated parse scrape store', err));
  },
  () => {
    console.log('stop');
    /* This function is executed when the job stops */
  },
  false /* Start the job right now */,
  'America/New_York' /* Time zone of this job. */,
);

module.exports = { scraper };
