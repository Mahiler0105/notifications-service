import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  controllers: [EmailController],
  imports: [CqrsModule],
})
export class ApiModule {}
