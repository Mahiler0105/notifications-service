import { Logger } from '@nestjs/common';

export class NotFoundException extends Error {
  private readonly _logger = new Logger(NotFoundException.name);

  constructor(message: string) {
    super(message);
    this._logger.error(message);
  }
}
