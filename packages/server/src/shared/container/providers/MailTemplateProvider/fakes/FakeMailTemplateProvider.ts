import fs from 'fs';

import { IParseMailTemplateDTO } from '@shared/container/providers/MailTemplateProvider/dtos';
import { IMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/models';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    let fileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      fileContent = fileContent.replace(regex, String(value));
    });
    return fileContent;
  }
}

export default FakeMailTemplateProvider;
