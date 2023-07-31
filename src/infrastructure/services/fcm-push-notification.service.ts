import { IPushNotificationService } from '../../domain/push-notifications/interfaces/push-notification-service.interface';
import { PushNotification } from '../../domain/push-notifications/models/push-notification';
import { JWT } from 'google-auth-library';
import admin, { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../../../configuration/firebase-adminsdk.json';
import { Inject, Injectable, Scope } from '@nestjs/common';
import axios from 'axios';
import { PushNotificationOptions } from '../configuration/options/push-notification-options';

export const GoogleJWTToken = Symbol('GoogleJWT');

@Injectable({ scope: Scope.TRANSIENT })
export class FcmPushNotificationService implements IPushNotificationService {
  public static MESSAGING_SCOPE =
    'https://www.googleapis.com/auth/firebase.messaging';
  constructor(
    @Inject(GoogleJWTToken) private readonly _jwtClient: JWT,
    private readonly _pushNotificationOptions: PushNotificationOptions,
  ) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  }

  async sendPushNotification(
    pushNotification: PushNotification,
    deviceTokens: Array<string>,
  ): Promise<void> {
    const token = await this.generateBearerToken();
    if (token instanceof Error) {
      console.error('Error generating bearer token:', token);
      return;
    }

    for (const deviceToken of deviceTokens) {
      const fcmMessage = {
        message: {
          token: deviceToken,
          data: pushNotification.payload,
          notification: {
            title: pushNotification.title,
            body: pushNotification.body,
          },
          android: {
            notification: {
              image: pushNotification.imageUrl,
              // icon: 'notification_icon',
              // color: '#304c7b',
            },
          },
        },
      };

      try {
        const response = await axios({
          method: 'post',
          url: `https://fcm.googleapis.com/v1/projects/${this._pushNotificationOptions.projectId}/messages:send`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: fcmMessage,
        });

        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
  }

  private generateBearerToken(): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      this._jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  }
}
