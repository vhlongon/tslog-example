import { Logger } from 'tslog';
import type { LogType } from './types';

export function main(logType: LogType = 'json') {
  const logger = new Logger({
    type: logType,
  });

  logger.debug('Logging as JSON:', { fruit: '🍒' });
}
