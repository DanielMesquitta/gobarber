import { resolve } from 'path';
import { injectable, inject } from 'tsyringe';

import {
  IUsersRepository,
  IUserTokensRepository,
} from '@modules/users/repositories';
import { IMailProvider } from '@shared/container/providers/MailProvider/models';
import { AppError } from '@shared/errors';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('This email is not registered');
    const { token } = await this.userTokensRepository.generate(user.id);
    const file = resolve(__dirname, '..', 'views', 'forgot-password.hbs');
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        address: user.email,
      },
      subject: 'Password recovery',
      template: {
        file,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
