import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PushNotificationController } from './push-notification.controller';

@Module({
  controllers: [EmailController, PushNotificationController],
  imports: [CqrsModule],
})
export class ApiModule {}
