import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';

interface IRequest {
  not_included_user_id?: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(data?: IRequest): Promise<User[] | undefined> {
    const { not_included_user_id } = data || {};
    let providers: User[] = [];
    if (not_included_user_id) {
      providers = await this.usersRepository.findAllProviders({
        not_included_user_id,
      });
    } else {
      providers = await this.usersRepository.findAllProviders();
    }
    return providers;
  }
}

export default ListProvidersService;
