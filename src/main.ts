import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CommandFactory } from 'nest-commander';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // await initCli();
  await initHttpServer(app, configService);
  await initGrpcServer(app, configService);
}

async function initHttpServer(
  app: INestApplication,
  configService: ConfigService,
) {
  await app.listen(configService.get('http.port', 3000));
}

async function initCli() {
  await CommandFactory.run(AppModule, {
    logger: false,
  });
}

async function initGrpcServer(
  app: INestApplication,
  configService: ConfigService,
) {
  const grpcPort = configService.get('grpc.port', 5000);
  const grpcHost = configService.get('grpc.host');
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      url: `${grpcHost}:${grpcPort}`,
      package: 'email',
      protoPath: join(__dirname, '../../email', 'email.proto'),
    },
  };

  const microservice = app.connectMicroservice(microserviceOptions);
  await microservice.listen();
}

bootstrap();
