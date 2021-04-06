import { IParseMailTemplateDTO } from '../dtos';
import { IMailTemplateProvider } from '../models';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      template = template.replace(regex, String(value));
    });
    return template;
  }
}

export default FakeMailTemplateProvider;
