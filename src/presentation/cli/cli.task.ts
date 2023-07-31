import { CommandBus } from '@nestjs/cqrs';
import { SendTransactionalEmailCommand } from '../../application/features/sendTransactionalEmail/send-transactional-email.command';
import { TemplateNames } from '../../domain/email/enums/template-names.enum';
import { Receiver } from '../../domain/email/models/receiver.model';
import { Command, CommandRunner, Option } from 'nest-commander';
import * as figlet from 'figlet';
import {
  spinnerError,
  spinnerSuccess,
  updateSpinnerText,
} from './helpers/spinner.helper';

@Command({
  name: 'send-customer-christmas-email',
  options: { isDefault: false },
})
export class CliTask extends CommandRunner {
  constructor(private readonly _commandBus: CommandBus) {
    super();
  }

  @Option({
    flags: '-e, --email <email>',
    description: 'Receiver email',
    required: true,
  })
  parseEmail(val: string) {
    return val;
  }

  @Option({
    flags: '-n, --name <name>',
    description: 'Receiver name',
    required: true,
  })
  parseName(val: string) {
    return val;
  }

  @Option({
    flags: '-p, --params <params>',
    description: 'Template parameters',
    required: true,
  })
  parseParameters(val: string) {
    return val;
  }

  async run(inputs: string[], options: Record<string, any>): Promise<void> {
    figlet.text('Notification Service', async (error: any, title: string) => {
      console.log(title);
      await this.sendEmail(options);
    });
  }

  private async sendEmail(options: Record<string, any>) {
    try {
      updateSpinnerText('Sending email');
      const receivers = new Array<Receiver>(
        new Receiver(options['email'], options['name']),
      );
      await this._commandBus.execute(
        new SendTransactionalEmailCommand(
          TemplateNames.CUSTOMER_CHRISTMAS,
          JSON.parse(options['params']),
          receivers,
        ),
      );
      spinnerSuccess(`Email sent successfully to ${options['email']}`);
    } catch (exception) {
      spinnerError(
        `An error occurred while sending the email -> ${exception.message}`,
      );
    }
  }
}
