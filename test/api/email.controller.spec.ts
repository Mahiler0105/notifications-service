import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from '../../src/presentation/api/email.controller';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { TransactionalEmailRequestDto } from '../../src/presentation/api/dto/transactional-email-request.dto';
import { NotFoundException } from '../../src/application/shared/exceptions/not-found.exception';
import { TemplateNames } from '../../src/domain/email/enums/template-names.enum';
import {
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Receiver } from '../../src/domain/email/models/receiver.model';

describe('EmailController', () => {
  let sut: EmailController;
  let commandBus: CommandBus;

  const transactionalEmailRequestDto = new TransactionalEmailRequestDto();
  transactionalEmailRequestDto.parameters = { NAME: 'Name' };
  transactionalEmailRequestDto.receivers = new Array<Receiver>(
    new Receiver('name@domain.co', 'Name'),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      imports: [CqrsModule],
    }).compile();

    sut = module.get<EmailController>(EmailController);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be not throw Exception in sendCustomerChristmasEmail method', async () => {
    // Arrange
    const commandBusExecute = jest.spyOn(commandBus, 'execute');
    commandBusExecute.mockResolvedValue(Promise.resolve(1));

    // Act
    const currentResult = async () => {
      await sut.sendCustomerChristmasEmail(transactionalEmailRequestDto);
    };

    // Assert
    expect(currentResult).not.toThrowError();
    expect(commandBusExecute).toHaveBeenCalled();
    expect(commandBusExecute).toHaveBeenCalledWith({
      parameters: transactionalEmailRequestDto.parameters,
      receivers: transactionalEmailRequestDto.receivers,
      templateName: TemplateNames.CUSTOMER_CHRISTMAS,
    });
  });

  it('should be throw Service Unavailable Exception in sendCustomerChristmasEmail method', async () => {
    // Arrange
    const commandBusExecute = jest.spyOn(commandBus, 'execute');

    commandBusExecute.mockRejectedValue(
      new NotFoundException(
        `No existe el template: ${TemplateNames.CUSTOMER_CHRISTMAS}`,
      ),
    );

    // Act
    const currentResult = async () => {
      await sut.sendCustomerChristmasEmail(transactionalEmailRequestDto);
    };

    // Assert
    await expect(currentResult).rejects.toThrow(ServiceUnavailableException);
    expect(commandBusExecute).toHaveBeenCalled();
    expect(commandBusExecute).toHaveBeenCalledWith({
      parameters: transactionalEmailRequestDto.parameters,
      receivers: transactionalEmailRequestDto.receivers,
      templateName: TemplateNames.CUSTOMER_CHRISTMAS,
    });
  });

  it('should be throw Internal Server Error Exception in sendCustomerChristmasEmail method', async () => {
    // Arrange
    const commandBusExecute = jest.spyOn(commandBus, 'execute');

    commandBusExecute.mockRejectedValue(new Error());

    // Act
    const currentResult = async () => {
      await sut.sendCustomerChristmasEmail(transactionalEmailRequestDto);
    };

    // Assert
    await expect(currentResult).rejects.toThrow(InternalServerErrorException);
    expect(commandBusExecute).toHaveBeenCalled();
    expect(commandBusExecute).toHaveBeenCalledWith({
      parameters: transactionalEmailRequestDto.parameters,
      receivers: transactionalEmailRequestDto.receivers,
      templateName: TemplateNames.CUSTOMER_CHRISTMAS,
    });
  });
});
