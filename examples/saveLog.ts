import { appendFileSync } from 'node:fs';
import { Logger } from 'tslog';
import type { LogType } from './types';

const saveLog = (logObj: Record<string, unknown>) => {
  appendFileSync('logs.txt', `${JSON.stringify(logObj)}\n\n`);
};
export function main(logType?: LogType) {
  const logger = new Logger({
    type: logType,
    attachedTransports: [saveLog],
  });

  logger.warn('I am a warn log with a json object:', { foo: 'bar' });
}
