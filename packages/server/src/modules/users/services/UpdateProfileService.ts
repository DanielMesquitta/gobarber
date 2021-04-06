import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities';
import { IHashProvider } from '@modules/users/providers/HashProvider/models';
import { AppError } from '@shared/errors';

import { IUsersRepository } from '../repositories';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User not found', 404);
    const userWithRequestEmail = await this.usersRepository.findByEmail(email);
    if (userWithRequestEmail && userWithRequestEmail.id !== user_id)
      throw new AppError('Another user is already registered with this email');
    Object.assign(user, { name, email });
    if (password && !old_password)
      throw new AppError(
        'You need to inform the old password to set a new password'
      );
    if (password && old_password) {
      const oldPasswordMatch = await this.hashProvider.compareHash(
        old_password,
        user.password_hash
      );
      if (!oldPasswordMatch) throw new AppError('Old password does not match');
      user.password_hash = await this.hashProvider.generateHash(password);
    }
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateProfileService;
