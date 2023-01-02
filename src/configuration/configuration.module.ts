import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Configuration from './configuration';
import { EmailProviderOptions } from './options/email-provider-options';

@Module({
  imports: [ConfigModule.forRoot({ load: [Configuration] })],
  providers: [EmailProviderOptions],
  exports: [EmailProviderOptions],
})
export class ConfigurationModule {}
