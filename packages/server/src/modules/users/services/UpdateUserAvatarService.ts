import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models';
import { AppError } from '@shared/errors';

interface IRequest {
  user_id: string;
  filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('Only authenticated users can change', 401);
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    const storedFilename = await this.storageProvider.saveFile(filename);
    user.avatar = storedFilename;
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
