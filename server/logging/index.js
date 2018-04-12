const appRoot = require('app-root-path');
const Winston = require('winston');
const DailyWinston = require('winston-daily-rotate-file');
const fs = require('fs');

const env = process.env.NODE_ENV;

const logDir = 'logs';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const fullLogsDir = `${appRoot}/logs`;

const tsFormat = () => new Date().toLocaleTimeString();

const consoleConfig = {
  debug: {
    name: 'reporterAgentConsoleDebug',
    level: 'debug',
    timestamp: tsFormat,
    handleExceptions: false,
    json: false,
    colorize: true,
  },
  verbose: {
    name: 'verbose',
    level: 'verbose',
    timestamp: tsFormat,
    handleExceptions: false,
    json: false,
    colorize: true,
  },
  info: {
    name: 'info',
    level: 'info',
    timestamp: tsFormat,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const fileConfig = {
  app: {
    filename: `${fullLogsDir}/app-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    timestamp: tsFormat,
    handleExceptions: true,
    json: env !== 'development',
  },
  reporterAgent: {
    level: 'verbose',
    filename: `${fullLogsDir}/reporter-agent-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    timestamp: tsFormat,
    handleExceptions: true,
    json: env !== 'development',
  },
};

const logger = new Winston.Logger({
  transports: [
    new Winston.transports.Console(consoleConfig.info),
    // new Winston.transports.Console(consoleConfig.debug),
    // new Winston.transports.File(consoleConfig.file),
    new DailyWinston(fileConfig.app),
  ],
});

const RALogger = new Winston.Logger({
  transports: [
    // new Winston.transports.Console(consoleConfig.verbose),
    new DailyWinston(fileConfig.reporterAgent),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

logger.exitOnError = false;

module.exports = { logger, RALogger };
