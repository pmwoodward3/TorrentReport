const appRoot = require('app-root-path');
const Winston = require('winston');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';

const logDir = 'logs';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => new Date().toLocaleTimeString();

const options = {
  file: {
    name: 'file',
    timestamp: tsFormat,
    filename: `${appRoot}/logs/app.log`,
    level: env === 'development' ? 'debug' : 'info',
    handleExceptions: true,
    json: env !== 'development',
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  fileReporterAgentDebug: {
    name: 'reporterAgentDebug',
    timestamp: tsFormat,
    filename: `${appRoot}/logs/reporteragent.log`,
    level: 'debug',
    handleExceptions: false,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  fileReporterAgentVerbose: {
    name: 'reporterAgentVerbose',
    timestamp: tsFormat,
    filename: `${appRoot}/logs/reporteragent.log`,
    level: 'verbose',
    handleExceptions: false,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  consoleDebug: {
    name: 'reporterAgentConsoleDebug',
    level: 'debug',
    timestamp: tsFormat,
    handleExceptions: false,
    json: false,
    colorize: true,
  },
  consoleVerbose: {
    name: 'consoleVerbose',
    level: 'verbose',
    timestamp: tsFormat,
    handleExceptions: false,
    json: false,
    colorize: true,
  },
  consoleInfo: {
    name: 'consoleInfo',
    level: 'info',
    timestamp: tsFormat,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = new Winston.Logger({
  transports: [
    new Winston.transports.Console(options.consoleInfo),
    // new Winston.transports.Console(options.consoleDebug),
    new Winston.transports.File(options.file),
  ],
});

const RALogger = new Winston.Logger({
  transports: [
    // new Winston.transports.Console(options.consoleVerbose),
    // new Winston.transports.File(options.fileReporterAgentDebug),
    new Winston.transports.File(options.fileReporterAgentVerbose),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

logger.exitOnError = false;

module.exports = { logger, RALogger };
