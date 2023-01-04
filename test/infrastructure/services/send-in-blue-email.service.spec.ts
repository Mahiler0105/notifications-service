import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationModule } from '../../../src/configuration/configuration.module';
import { SendInBlueEmailService } from '../../../src/infrastructure/services/send-in-blue-email.service';
import { EmailServiceToken } from '../../../src/application/email/interfaces/email-service.interface';

describe('EmailController', () => {
  let sut: SendInBlueEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendInBlueEmailService,
        { provide: EmailServiceToken, useExisting: SendInBlueEmailService },
      ],
      exports: [EmailServiceToken],
      imports: [ConfigurationModule],
    }).compile();

    sut = module.get<SendInBlueEmailService>(SendInBlueEmailService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
