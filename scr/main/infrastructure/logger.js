module.exports = () => {
  const winston = require('winston')
  const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        'timestamp': true
      })
    ]
  })
  logger.level = process.env.LOG_LEVEL || 'info'
  return logger
}
