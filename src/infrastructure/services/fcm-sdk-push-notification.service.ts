import { IPushNotificationService } from '../../domain/push-notifications/interfaces/push-notification-service.interface';
import { PushNotification } from '../../domain/push-notifications/models/push-notification';
import { Inject, Injectable, Scope } from '@nestjs/common';
import type { Messaging } from 'firebase-admin/lib/messaging';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';

export const GoogleMessagingToken = Symbol('GoogleMessaging');

@Injectable({ scope: Scope.TRANSIENT })
export class FcmSdkPushNotificationService implements IPushNotificationService {
  constructor(
    @Inject(GoogleMessagingToken) private readonly _googleMessaging: Messaging,
  ) {}

  async sendPushNotification(
    pushNotification: PushNotification,
    deviceTokens: Array<string>,
  ): Promise<void> {
    const multicastMessage: MulticastMessage = {
      tokens: deviceTokens,
      notification: {
        title: pushNotification.title,
        body: pushNotification.body,
        imageUrl: pushNotification.imageUrl,
      },
      data: pushNotification.payload as { [p: string]: string },
    };

    const batchResponse = await this._googleMessaging.sendEachForMulticast(
      multicastMessage,
    );

    if (batchResponse.failureCount > 0) {
      const failedTokens = Array<string>();
      batchResponse.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(deviceTokens[idx]);
        }
      });
      console.log('List of tokens that caused failures: ' + failedTokens);
    }
  }
}
