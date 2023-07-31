import { Module } from '@nestjs/common';
import { SendInBlueEmailService } from './services/send-in-blue-email.service';
import { EmailServiceToken } from '../domain/email/interfaces/email-service.interface';
import { ConfigurationModule } from './configuration/configuration.module';
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@sendinblue/client';
import { EmailProviderOptions } from './configuration/options/email-provider-options';
import {
  FcmPushNotificationService,
  GoogleJWTToken,
} from './services/fcm-push-notification.service';
import { PushNotificationServiceToken } from '../domain/push-notifications/interfaces/push-notification-service.interface';
import { JWT } from 'google-auth-library';
import * as serviceAccount from '../../configuration/firebase-adminsdk.json';

const services = [SendInBlueEmailService, FcmPushNotificationService];
const dependencyInversionServices = [
  { provide: EmailServiceToken, useExisting: SendInBlueEmailService },
  {
    provide: PushNotificationServiceToken,
    useExisting: FcmPushNotificationService,
  },
];

@Module({
  providers: [
    ...services,
    ...dependencyInversionServices,
    {
      provide: GoogleJWTToken,
      useFactory: () => {
        return new JWT(
          serviceAccount.client_email,
          null,
          serviceAccount.private_key,
          [FcmPushNotificationService.MESSAGING_SCOPE],
          null,
        );
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
