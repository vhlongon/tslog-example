import { appendFileSync } from 'node:fs';
import { Logger } from 'tslog';
import { randomInt } from 'node:crypto';
import type { LogType } from './types';

// Attaches external Loggers, e.g. external log services, file system, database

const saveLog = (logObj: Record<string, unknown>) => {
  appendFileSync('logs.txt', `${JSON.stringify(logObj)}\n\n`);
};
export function main(logType?: LogType) {
  const logger = new Logger({
    type: logType,
    // attach different transports when creating a log instance
    attachedTransports: [saveLog],
  });

  // or later
  // logger.attachTransport(saveLog);

  const randomId = randomInt(1, 1000000);
  logger.warn('Some log that will be saved to a file:', {
    foo: 'bar',
    id: randomId,
  });
}
