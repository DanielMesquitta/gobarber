import { ISendMailDTO } from '@shared/container/providers/MailProvider/dtos';

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
