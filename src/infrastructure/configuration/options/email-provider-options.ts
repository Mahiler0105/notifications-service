import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailProviderOptions {
  constructor(private _configService: ConfigService) {}

  get apiKey(): string {
    return this._configService.get('providers.email.apiKey');
  }
}
