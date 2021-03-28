import fs from 'fs';
import { join } from 'path';
import { getRepository } from 'typeorm';

import { uploadConfig } from '~/configs';
import { User } from '~/models';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: { id: user_id },
    });
    if (!user) throw new Error('Only authenticated users can change');
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
