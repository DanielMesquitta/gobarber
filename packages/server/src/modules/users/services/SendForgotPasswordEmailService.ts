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
    await this.userTokensRepository.generate(user.id);
    this.mailProvider.sendMail(email, 'Recovery email');
  }
}

export default SendForgotPasswordEmailService;
