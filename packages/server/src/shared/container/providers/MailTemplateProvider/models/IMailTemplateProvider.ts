import { IParseMailTemplateDTO } from '@shared/container/providers/MailTemplateProvider/dtos';

interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
