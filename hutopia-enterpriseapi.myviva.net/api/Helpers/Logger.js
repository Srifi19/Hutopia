const winston = require('winston');

// Define log levels and colors
const logLevels = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  debug: 'debug',
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

// Create a Winston logger with transports (console and file)
const logger = winston.createLogger({
    format: winston.format.simple(), // Use a simple log format,
  transports: [
    // Log to the console
    new winston.transports.Console(),

    // Log to a file (you can add more transports here)
    new winston.transports.File({ filename: 'app.log', level: 'info' }),
  ],
});

module.exports = logger;
