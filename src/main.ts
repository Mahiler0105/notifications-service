import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CommandFactory } from 'nest-commander';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  // await initCli();
  await initHttpServer(configService);
  await initGrpcServer(configService);
}

async function initHttpServer(configService: ConfigService) {
  const app = await NestFactory.create(AppModule);
  await app.listen(configService.get('http.port', 3000));
}

async function initCli() {
  await CommandFactory.run(AppModule, {
    logger: false,
  });
}

async function initGrpcServer(configService: ConfigService) {
  const grpcPort = configService.get('grpc:port', 5000);
  const grpcHost = configService.get('grpc:host');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${grpcHost}:${grpcPort}`,
        package: 'email',
        protoPath: join(__dirname, 'email/email.proto'),
      },
    },
  );
  await app.listen();
}

bootstrap();
