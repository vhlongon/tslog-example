import { Logger } from 'tslog';
import type { LogType } from './types';

const errorHandler =
  <T = unknown>(logger: Logger<T>, ...args: unknown[]) =>
  (callback: () => void) => {
    try {
      callback();
    } catch (error) {
      logger.error('erroHandler 1 >', ...args);
      logger.error(error);
    }
  };

const anotherFunction = <T>(logger: Logger<T>) => {
  const randomError = Math.random() > 0.5;

  try {
    if (randomError) {
      throw new Error('Randomly thrown error');
    }
    // no error here
  } catch (error) {
    logger.error('Using the logger more directly - I caught an error');
  }
};

export function main(logType?: LogType) {
  const logger = new Logger({
    minLevel: 5,
    type: logType,
  });

  const withErrorWrapper = errorHandler(logger, 'I caught an error');

  withErrorWrapper(() => {
    throw new Error('Example of function that throws an error');
  });

  withErrorWrapper(() => {
    // no error here
  });

  // or simply use the logger directly, passing the logger instance
  anotherFunction(logger);
}
