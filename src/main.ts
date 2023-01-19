import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  await initHttpServer();
  // await initCli();
}

async function initHttpServer() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('http.port', 3000));
}

async function initCli() {
  await CommandFactory.run(AppModule, {
    logger: false,
  });
}

bootstrap();
