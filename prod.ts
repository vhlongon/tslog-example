import { Logger } from 'tslog';

//  check more import things to optimized in production https://tslog.js.org/#/?id=%e2%9d%97performance
const logger = new Logger({
  // or something like process.env.NODE_ENV === 'production', to keep logs in production to a minimum
  hideLogPositionForProduction: true,
  // 0: silly, 1: trace, 2: debug, 3: info, 4: warn, 5: error, 6: fatal
  minLevel: 3,
});

// wont show
logger.silly('I am a silly log.');
logger.trace('I am a trace log.');
logger.debug('I am a debug log.');

// will show
logger.info('I am an info log.');
logger.warn('I am a warn log with a json object:');
logger.error('I am an error log with a json object:');
logger.fatal('I am a fatal log with a json object:');
