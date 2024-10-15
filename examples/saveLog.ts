import { Logger } from 'tslog';
import { appendFileSync } from 'node:fs';

export function main() {
  const logger = new Logger();
  logger.attachTransport(logObj => {
    appendFileSync('logs.txt', `${JSON.stringify(logObj)}\n`);
  });

  logger.debug('I am a debug log.');
  logger.info('I am an info log.');
  logger.warn('I am a warn log with a json object:', { foo: 'bar' });
}
