import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { CliModule } from './cli/cli.module';
import { GrpcModule } from './grpc/grpc.module';

@Module({
  imports: [
    CliModule,
    ApiModule,
    ApplicationModule,
    InfrastructureModule,
    ConfigurationModule,
    GrpcModule,
  ],
})
export class AppModule {}
