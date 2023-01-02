import { Module } from '@nestjs/common';
import { SendTransactionalEmailHandler } from './features/sendTransactionalEmail/send-transactional-email.handler';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

const commandHandlers = [SendTransactionalEmailHandler];

@Module({
  providers: [...commandHandlers],
  imports: [InfrastructureModule],
})
export class ApplicationModule {}
