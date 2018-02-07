const { CronJob } = require('cron');
const pSS = require('./api/parseScrapeStore');
const { sendError } = require('./notifier/email/emails');

const scraper = new CronJob(
  '00 43 04 * * *',
  () => {
    console.log('starting automated scrape cron');
    pSS().catch(err => sendError('automated parse scrape store catch', err));
  },
  () => {
    console.log('stop');
    /* This function is executed when the job stops */
    sendError('automated parse scrape store has stopped', 'stop log called');
  },
  false /* Start the job right now */,
  'America/New_York' /* Time zone of this job. */,
);

module.exports = { scraper };
