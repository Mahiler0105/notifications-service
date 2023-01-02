import { Module } from '@nestjs/common';
import { SendInBlueEmailService } from './services/send-in-blue-email.service';
import { EmailServiceToken } from '../application/email/interfaces/email-service.interface';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  providers: [
    SendInBlueEmailService,
    { provide: EmailServiceToken, useExisting: SendInBlueEmailService },
  ],
  exports: [EmailServiceToken],
  imports: [ConfigurationModule],
})
export class InfrastructureModule {}
