import { PushNotification } from '../models/push-notification';

export const PushNotificationServiceToken = Symbol('PushNotificationService');

export interface IPushNotificationService {
  sendPushNotification(
    pushNotification: PushNotification,
    deviceTokens: Array<string>,
  ): Promise<void>;
}
