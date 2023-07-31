import { Module } from '@nestjs/common';
import { SendTransactionalEmailHandler } from './features/sendTransactionalEmail/send-transactional-email.handler';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { SendPushNotificationHandler } from './features/sendPushNotification/send-push-notification.handler';

const commandHandlers = [
  SendTransactionalEmailHandler,
  SendPushNotificationHandler,
];

@Module({
  providers: [...commandHandlers],
  imports: [InfrastructureModule],
})
export class ApplicationModule {}
