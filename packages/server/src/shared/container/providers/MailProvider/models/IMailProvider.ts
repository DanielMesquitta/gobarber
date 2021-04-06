import { ISendMailDTO } from '../dtos';

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
