import { Email } from '../models/email.model';

export const EmailServiceToken = Symbol('EmailService');

export interface IEmailService {
  sendEmail(email: Email): Promise<string>;
  getTemplateIdByNameAsync(templateName: string): Promise<number | null>;
}
