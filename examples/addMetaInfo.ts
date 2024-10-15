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

  const logged = logger.debug('Log with total custom meta info: ');
  console.log(JSON.stringify(logged, null, 2));

  const logger2 = new Logger({
    type: logType,
    metaProperty: 'CustomMetaName',
  });

  console.log('\n');

  const logged2 = logger2.debug('Log with custom meta property name: ');
  console.log(JSON.stringify(logged2, null, 2));
}
