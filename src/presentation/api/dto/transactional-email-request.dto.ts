import { Receiver } from '../../../domain/email/models/receiver.model';

export class TransactionalEmailRequestDto {
  public parameters: Record<string, unknown>;
  public receivers: Array<Receiver>;
}
