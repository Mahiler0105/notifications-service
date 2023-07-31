import { Module } from '@nestjs/common';
import { SendInBlueEmailService } from './services/send-in-blue-email.service';
// import {
//   FcmPushNotificationService,
//   GoogleJWTToken,
// } from './services/fcm-push-notification.service';

import admin, { ServiceAccount } from 'firebase-admin';
import { PushNotificationServiceToken } from '../domain/push-notifications/interfaces/push-notification-service.interface';
import { EmailServiceToken } from '../domain/email/interfaces/email-service.interface';
import { EmailProviderOptions } from './configuration/options/email-provider-options';
import { ConfigurationModule } from './configuration/configuration.module';
import * as serviceAccount from '../../configuration/firebase-adminsdk.json';
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@sendinblue/client';
// import { JWT } from 'google-auth-library';
import {
  FcmSdkPushNotificationService,
  GoogleMessagingToken,
} from './services/fcm-sdk-push-notification.service';

// const services = [SendInBlueEmailService, FcmPushNotificationService];
const services = [SendInBlueEmailService, FcmSdkPushNotificationService];
// const dependencyInversionServices = [
//   { provide: EmailServiceToken, useExisting: SendInBlueEmailService },
//   {
//     provide: PushNotificationServiceToken,
//     useExisting: FcmPushNotificationService,
//   },
// ];
const dependencyInversionServices = [
  { provide: EmailServiceToken, useExisting: SendInBlueEmailService },
  {
    provide: PushNotificationServiceToken,
    useExisting: FcmSdkPushNotificationService,
  },
];

@Module({
  providers: [
    ...services,
    ...dependencyInversionServices,
    // {
    //   provide: GoogleJWTToken,
    //   useFactory: () => {
    //     return new JWT(
    //       serviceAccount.client_email,
    //       null,
    //       serviceAccount.private_key,
    //       [FcmPushNotificationService.MESSAGING_SCOPE],
    //       null,
    //     );
    //   },
    // },
    {
      provide: GoogleMessagingToken,
      useFactory: () => {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
        return admin.messaging();
      },
    },
    {
      inject: [EmailProviderOptions],
      provide: TransactionalEmailsApi,
      useFactory: async (_emailProviderOptions: EmailProviderOptions) => {
        const transactionalEmailsApi = new TransactionalEmailsApi();
        transactionalEmailsApi.setApiKey(
          TransactionalEmailsApiApiKeys.apiKey,
          _emailProviderOptions.apiKey,
        );
        return transactionalEmailsApi;
      },
    },
  ],
  exports: [EmailServiceToken, PushNotificationServiceToken],
  imports: [ConfigurationModule],
})
export class InfrastructureModule {}
