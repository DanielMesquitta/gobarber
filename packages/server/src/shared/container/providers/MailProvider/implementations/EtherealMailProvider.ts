import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { IMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/models';

import { ISendMailDTO } from '../dtos';
import { IMailProvider } from '../models';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    (async () => {
      const account = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    })();
  }

  public async sendMail({
    from,
    to,
    subject,
    template,
  }: ISendMailDTO): Promise<void> {
    try {
      const message = await this.client.sendMail({
        from: {
          name: from?.name || 'GoBarber Team',
          address: from?.address || 'email@example.com',
        },
        to,
        subject,
        html: await this.mailTemplateProvider.parse(template),
      });
      console.info(
        `E-mail preview URL: ${nodemailer.getTestMessageUrl(message)}`
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export default EtherealMailProvider;
