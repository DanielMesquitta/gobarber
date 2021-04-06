import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { authConfig } from '@configs';
import { User } from '@modules/users/infra/typeorm/entities';
import { IHashProvider } from '@modules/users/providers/HashProvider/models';
import { IUsersRepository } from '@modules/users/repositories';
import { AppError } from '@shared/errors';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('Incorrect email/password combination', 401);
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password_hash
    );
    if (!passwordMatched)
      throw new AppError('Incorrect email/password combination', 401);
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    delete user.password_hash;
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
