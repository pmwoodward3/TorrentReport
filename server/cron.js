const { logger } = require('./logging');
const { CronJob } = require('cron');
const reporterAgent = require('./reporterAgent');
const { sendError } = require('./notifier/email/emails');

const scraper = new CronJob(
  '00 17 01 * * *',
  () => {
    logger.info('starting automated scrape cron');
    reporterAgent().catch(err => sendError('automated parse scrape store catch', err));
  },
  () => {
    sendError('automated parse scrape store has stopped', 'stop log called');
  },
  true /* Start the job right now */,
  'America/New_York',
);

module.exports = { scraper };
