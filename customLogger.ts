import { Logger, type ILogObjMeta, type ISettingsParam, ILogObj } from 'tslog';

export class CustomLogger<LogObj> extends Logger<LogObj> {
  /**
   * Logs a _CUSTOM_ message.
   * @param args  - Multiple log attributes that should be logged.
   * @return LogObject with meta property, when log level is >= minLevel
   */
  public custom(...args: unknown[]): (LogObj & ILogObjMeta) | undefined {
    return super.log(8, 'CUSTOM', ...args);
  }
}

const logger = new CustomLogger({
  argumentsArrayName: 'args',
  prettyLogStyles: {
    logLevelName: {
      CUSTOM: ['bold', 'magentaBright'],
    },
  },
});

const logged = logger.custom('Using custom log level');

logger.info(logged);
