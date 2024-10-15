import { type ILogObjMeta, Logger } from 'tslog';

type LogLevel =
  | 'silly'
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'fatal';

abstract class BaseLogger<T = unknown> {
  public logger: Logger<T>;

  constructor(logger: Logger<T>) {
    this.logger = logger;
  }

  abstract log(message: unknown, level?: LogLevel): ILogObjMeta | undefined;
}

class Handler extends BaseLogger {
  log(message: unknown, level: LogLevel = 'silly'): ILogObjMeta | undefined {
    switch (level) {
      case 'silly': {
        return this.logger.silly(message);
      }
      case 'trace': {
        return this.logger.trace(message);
      }
      case 'debug': {
        return this.logger.debug(message);
      }
      case 'info': {
        return this.logger.info(message);
      }
      case 'warn': {
        return this.logger.warn(message);
      }
      case 'error': {
        return this.logger.error(message);
      }
      case 'fatal': {
        return this.logger.fatal(message);
      }
    }
  }
}

const logger = new Logger({
  name: 'My Logger',
  type: 'pretty', // "json" | "pretty" | "hidden"
  maskPlaceholder: 'XXX',
  prefix: ['!!'],
  maskValuesOfKeys: ['password', 'token'],
  prettyLogStyles: {
    logLevelName: {
      // '*': ['bold', 'black', 'bgWhiteBright', 'dim'],
      // SILLY: ['bold', 'white'],
      // TRACE: ['bold', 'whiteBright'],
      DEBUG: ['inverse', 'green'],
      // INFO: ['bold', 'blue'],
      // WARN: ['bold', 'yellow'],
      // ERROR: ['bold', 'red'],
      // FATAL: ['bold', 'redBright'],
    },
    dateIsoStr: 'white',
    filePathWithLine: 'white',
    name: ['white', 'bold'],
    nameWithDelimiterPrefix: ['white', 'bold'],
    nameWithDelimiterSuffix: ['white', 'bold'],
    errorName: ['bold', 'bgRedBright', 'whiteBright'],
    fileName: ['yellow'],
  },
});

const handler = new Handler(logger);

// const logged = handler.log('This is a silly log from Handler');
// you can get log object from the log method
// handler.log(logged, 'debug');

// log from a method
// handler.log('This is a silly log from Handler');
// handler.log('This is a trace log from Handler', 'trace');
// handler.log('This is a debug log from Handler', 'debug');
// handler.log('This is an info log from Handler', 'info');
// handler.log('This is a warn log from Handler', 'warn');
// handler.log('This is an error log from Handler', 'error');
// handler.log('This is a fatal log from Handler', 'fatal');

// mask values of keys
// handler.log({ token: '123' }, 'info');

// or expose the logger directly
// handler.logger.silly('This is a debug log from Handler', { token: '123' });
// etc...

// namespacing
const childLog = handler.logger.getSubLogger({
  prefix: ['@'],
  name: 'ChildLogger',
  prettyErrorParentNamesSeparator: ' > ',
});
childLog.debug('This is a debug log from childLog');
const grandChildLog = childLog.getSubLogger({
  prefix: ['$'],
  name: 'GrandChildLogger',
});
grandChildLog.debug('This is a debug log from grandChildLog');
