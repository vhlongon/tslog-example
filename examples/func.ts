import { Logger } from 'tslog';
import type { LogType } from './types';

const withErrorHandler =
  <T = unknown>(logger: Logger<T>, ...args: unknown[]) =>
  (callback: () => void) => {
    try {
      callback();
    } catch (error) {
      logger.error(error, ...args);
    }
  };

const faultyFunction = <T>(logger: Logger<T>) => {
  try {
    const error = new Error('faultyFunction: error');
    throw error;
  } catch (error) {
    logger.fatal(error);
  }
};

export function main(logType?: LogType) {
  const logger = new Logger({
    minLevel: 5,
    type: logType,
    prettyLogStyles: {
      logLevelName: {
        ERROR: ['dim', 'bgRedBright'],
        FATAL: ['bold', 'bgRedBright'],
      },
    },
  });

  const run = withErrorHandler(logger);

  run(() => {
    throw new Error('withErrorHandler: error');
  });

  run(() => {
    // no error here
  });

  // or simply use the logger directly, passing the logger instance
  faultyFunction(logger);
}
