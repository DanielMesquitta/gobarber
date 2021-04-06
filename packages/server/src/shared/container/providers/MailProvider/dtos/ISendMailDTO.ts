import { IParseMailTemplateDTO } from '@shared/container/providers/MailTemplateProvider/dtos';

interface IMailContact {
  name: string;
  address: string;
}

interface ISendMailDTO {
  to: IMailContact[] | IMailContact;
  from?: IMailContact;
  subject: string;
  template: IParseMailTemplateDTO;
}

export default ISendMailDTO;
