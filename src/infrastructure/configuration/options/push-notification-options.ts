import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PushNotificationOptions {
  constructor(private _configService: ConfigService) {}

  get projectId(): string {
    return this._configService.get('providers.push-notification.projectId');
  }
}
