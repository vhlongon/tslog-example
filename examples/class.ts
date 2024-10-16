import { type ILogObjMeta, Logger } from 'tslog';
import type { LogLevel, LogType } from './types';

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

export function main(logType?: LogType) {
  const logger = new Logger({
    name: 'My Logger',
    type: logType,
    maskPlaceholder: '🍌',
    prefix: ['!!'],
    maskValuesOfKeys: ['password', 'token', 'banana'],
    prettyLogStyles: {
      logLevelName: {
        '*': ['bold', 'black', 'bgWhiteBright', 'dim'],
        // change the color, default is: ['bold', 'white'],
        SILLY: ['dim', 'white'],
        // change the color, default is: ['bold', 'whiteBright'],
        TRACE: ['italic', 'whiteBright'],
        // change the color, default is ["bold", "green"],
        DEBUG: ['inverse', 'green'],
        INFO: ['bold', 'blue'],
        WARN: ['bold', 'yellow'],
        ERROR: ['bold', 'red'],
        FATAL: ['bold', 'bgRedBright'],
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

  // you can get log object from the log method
  const logged = handler.log('This is a silly log from Handler');
  // you can use the log object to get more information like meta data
  handler.logger.info('This is the log object', logged);

  // log from a method
  handler.log('This is a silly log from Handler');
  handler.log('This is a trace log from Handler', 'trace');
  handler.log('This is a debug log from Handler', 'debug');
  handler.log('This is an info log from Handler', 'info');
  handler.log('This is a warn log from Handler', 'warn');
  handler.log('This is an error log from Handler', 'error');
  handler.log('This is a fatal log from Handler', 'fatal');

  // mask values of keys
  handler.log({ token: '123', password: 'abc', banana: 'very good' }, 'info');

  // or expose the logger directly
  handler.logger.silly('This is a debug log from Handler', { token: '123' });
  // etc...
}
