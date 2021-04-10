import { getRepository, Not, Repository } from 'typeorm';

import { ICreateUserDTO, IFindAllProvidersDTO } from '@modules/users/dtos';
import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders(data?: IFindAllProvidersDTO): Promise<User[]> {
    const { not_included_user_id } = data || {};
    let providers: User[] = [];
    if (not_included_user_id) {
      providers = await this.ormRepository.find({
        where: {
          id: Not(not_included_user_id),
          is_provider: true,
        },
      });
    } else {
      providers = await this.ormRepository.find({
        where: { is_provider: true },
      });
    }
    return providers;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const updatedUser = await this.ormRepository.save(user);
    return updatedUser;
  }
}

export default UsersRepository;
