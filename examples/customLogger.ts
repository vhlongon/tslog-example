import { Logger, type ILogObjMeta, type ISettingsParam, ILogObj } from 'tslog';
import type { LogType } from './types';

class CustomLogger<LogObj> extends Logger<LogObj> {
  /**
   * Logs a _CUSTOM_ message.
   * @param args  - Multiple log attributes that should be logged.
   * @return LogObject with meta property, when log level is >= minLevel
   */
  public custom(...args: unknown[]): (LogObj & ILogObjMeta) | undefined {
    return super.log(8, 'CUSTOM', ...args);
  }
}

export function main(logType?: LogType) {
  const logger = new CustomLogger({
    argumentsArrayName: 'args',
    type: logType,
    prettyLogStyles: {
      logLevelName: {
        CUSTOM: ['bold', 'magentaBright'],
      },
    },
  });
  logger.custom('Using custom log level');
}
