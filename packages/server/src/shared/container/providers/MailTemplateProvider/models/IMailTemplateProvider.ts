import { IParseMailTemplateDTO } from '../dtos';

interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
