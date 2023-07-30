import { Module } from '@nestjs/common';
import { EmailProviderOptions } from '../../../src/infrastructure/configuration/options/email-provider-options';
import { EmailProviderOptionsMock } from '../email-provider-options.mock';

@Module({
  providers: [
    {
      provide: EmailProviderOptions,
      useClass: EmailProviderOptionsMock,
    },
  ],
  exports: [EmailProviderOptions],
})
export class ConfigurationModuleMock {}
