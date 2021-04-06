import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities';
import { AppError } from '@shared/errors';

import { IUsersRepository } from '../repositories';

interface IRequest {
  user_id: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User not found', 404);
    return user;
  }
}

export default UpdateProfileService;
