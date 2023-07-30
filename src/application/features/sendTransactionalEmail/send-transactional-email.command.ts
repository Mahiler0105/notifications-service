import { Receiver } from '../../../domain/email/models/receiver.model';

export class SendTransactionalEmailCommand {
  constructor(
    public templateName: string,
    public readonly parameters: Record<string, unknown>,
    public readonly receivers: Array<Receiver>,
  ) {}
}
