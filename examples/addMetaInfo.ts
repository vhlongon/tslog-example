import { type ILogObjMeta, type IMeta, type ISettings, Logger } from 'tslog';
import type { LogType } from './types';

export function main(logType?: LogType) {
  const logger = new Logger({
    type: logType,
    overwrite: {
      addMeta: <T>(logObj: T, logLevelId: number, logLevelName: string) => ({
        ...logObj,
        CustomMeta: {
          logLevelId,
          logLevelName,
          date: new Date(),
          runtime: `Node ${process.version}`,
          orderId: '123ABC',
          fruit: '🍍',
        },
      }),
    },
  });

  const logged = logger.debug('Log with custom meta info: ');
  logger.debug(JSON.stringify(logged, null, 2));
}
