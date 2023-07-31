import { Receiver } from './receiver.model';

export class Email {
  constructor(
    public templateId: number,
    public readonly parameters: Record<string, unknown>,
    public readonly receivers: Array<Receiver>,
  ) {}
}
