import fs from 'fs';
import { join } from 'path';
import { injectable, inject } from 'tsyringe';
import { getRepository } from 'typeorm';

import { uploadConfig } from '@configs';
import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';
import { AppError } from '@shared/errors';

interface IRequest {
  user_id: string;
  filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, filename }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('Only authenticated users can change', 401);
    if (user.avatar) {
      const avatarFilePath = join(uploadConfig.dest, user.avatar);
      const avatarExists = await fs.promises.stat(avatarFilePath);
      if (avatarExists) await fs.promises.unlink(avatarFilePath);
    }
    user.avatar = filename;
    delete user.password_hash;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
