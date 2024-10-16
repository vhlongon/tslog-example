import type { LogLevel } from './types';
import { type ISettingsParam, Logger } from 'tslog';

class Handler<LogObj> {
  public logger: Logger<LogObj>;

  constructor(logger: Logger<LogObj>) {
    const { name, prettyErrorParentNamesSeparator, prefix } = logger.settings;
    const isDefaultSeparator = prettyErrorParentNamesSeparator !== ':';
    logger.settings.name = `${name}::Handler`;
    logger.settings.prettyErrorParentNamesSeparator = isDefaultSeparator
      ? prettyErrorParentNamesSeparator
      : '🦠';
    logger.settings.prefix = [...prefix, '🔧'];
    this.logger = logger;
  }

  protected initializeLogger(
    logger: Logger<LogObj>,
    settings: ISettingsParam<LogObj>
  ): Logger<LogObj> {
    return logger.getSubLogger(settings);
  }

  log(message: string, level: LogLevel = 'info') {
    this.logger[level](message);
  }
}

class Controller<LogObj> extends Handler<LogObj> {
  constructor(logger: Logger<LogObj>) {
    super(logger);
    this.logger = this.initializeLogger(this.logger, {
      name: 'Controller',
      prefix: ['🚦'],
    });
  }

  // implement log method in any way, here we just call the logger method
  log(message: string) {
    this.logger.info(message);
  }
}

class Service<MyLogObj> extends Controller<MyLogObj> {
  constructor(logger: Logger<MyLogObj>) {
    super(logger);
    this.logger = this.initializeLogger(this.logger, {
      name: 'Service',
      prefix: ['🚀'],
    });
  }

  log(message: string, level: LogLevel = 'info') {
    this.logger[level](message);
  }
}

export function main() {
  const logger = new Logger({
    name: 'My Logger',
  });
  const service = new Service(logger);
  service.log('Info log message');
  service.log('debug log message', 'debug');
  service.log('Warn log message', 'warn');
}
