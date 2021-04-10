import { ISendMailDTO } from '@shared/container/providers/MailProvider/dtos';
import { IMailProvider } from '@shared/container/providers/MailProvider/models';

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(data: ISendMailDTO): Promise<void> {
    this.messages.push(data);
  }
}

export default FakeMailProvider;
