import { Logger } from 'tslog';

const logger = new Logger({
  minLevel: 5,
});

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

const handleError = errorHandler(logger, 'I caught an error');

handleError(() => {
  throw new Error('Something went wrong');
});

handleError(() => {
  console.log('No error here');
});

// or simply use the logger directly

const anotherFunction = () => {
  const randomError = Math.random() > 0.5;

  try {
    if (randomError) {
      throw new Error('Something went wrong');
    }
    console.log('No error here');
  } catch (error) {
    logger.error('Using the logger more directly - I caught an error');
  }
};

anotherFunction();
