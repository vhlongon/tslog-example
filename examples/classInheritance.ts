import type { LogLevel } from './types';
import { Logger } from 'tslog';

class Handler {
  public logger: Logger<unknown>;

  constructor(logger: Logger<unknown>) {
    logger.settings.name = `${logger.settings.name}::Handler`;
    logger.settings.prefix = ['🔧'];
    this.logger = logger;
  }

  log(message: string) {
    this.logger.info(message);
  }
}

class Controller extends Handler {
  constructor(logger: Logger<unknown>) {
    super(logger);
    this.logger = this.logger.getSubLogger({
      prettyErrorParentNamesSeparator: '🦠',
      name: 'Controller',
      prefix: ['🚦'],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }
}

class Service extends Controller {
  constructor(logger: Logger<unknown>) {
    super(logger);
    this.logger = this.logger.getSubLogger({
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
