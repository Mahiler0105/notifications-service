import { Module } from '@nestjs/common';
import { SendInBlueEmailService } from './services/send-in-blue-email.service';
import { EmailServiceToken } from '../domain/email/interfaces/email-service.interface';
import { ConfigurationModule } from './configuration/configuration.module';
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@sendinblue/client';
import { EmailProviderOptions } from './configuration/options/email-provider-options';

@Module({
  providers: [
    SendInBlueEmailService,
    { provide: EmailServiceToken, useExisting: SendInBlueEmailService },
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
  exports: [EmailServiceToken],
  imports: [ConfigurationModule],
})
export class InfrastructureModule {}
