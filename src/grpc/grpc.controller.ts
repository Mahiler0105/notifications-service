import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { TransactionalEmailRequestDto } from '../api/dto/transactional-email-request.dto';
import { CommandBus } from '@nestjs/cqrs';
import { SendTransactionalEmailCommand } from '../application/features/sendTransactionalEmail/send-transactional-email.command';
import { TemplateNames } from '../application/email/enums/template-names.enum';

@Controller()
export class GrpcController {
  constructor(private readonly _commandBus: CommandBus) {}

  @GrpcMethod('EmailService', 'SendCustomerChristmasEmail')
  async sendCustomerChristmasEmail(
    data: TransactionalEmailRequestDto,
  ): Promise<void> {
    try {
      await this._commandBus.execute(
        new SendTransactionalEmailCommand(
          TemplateNames.CUSTOMER_CHRISTMAS,
          data.parameters,
          data.receivers,
        ),
      );
    } catch (exception) {
      throw new RpcException(exception.message);
    }
  }
}
