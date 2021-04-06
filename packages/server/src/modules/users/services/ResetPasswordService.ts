import { addHours, isAfter } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@modules/users/providers/HashProvider/models';
import {
  IUsersRepository,
  IUserTokensRepository,
} from '@modules/users/repositories';
import { AppError } from '@shared/errors';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) throw new AppError('Invalid token', 403);
    const expirationDate = Number(addHours(userToken.created_at, 2));
    if (isAfter(Date.now(), expirationDate))
      throw new AppError('The token is expired', 403);
    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError('This user does not exists', 404);
    user.password_hash = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
