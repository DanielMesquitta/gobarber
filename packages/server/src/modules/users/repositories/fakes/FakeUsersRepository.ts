import { v4 as uuid } from 'uuid';

import { ICreateUserDTO, IFindAllProvidersDTO } from '@modules/users/dtos';
import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders(data?: IFindAllProvidersDTO): Promise<User[]> {
    let providers: User[] = [];
    const { not_included_user_id } = data || {};
    if (not_included_user_id) {
      providers = this.users.filter(
        (user) => user.is_provider && user.id !== not_included_user_id
      );
    } else {
      providers = this.users.filter((user) => user.is_provider);
    }
    return providers;
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.id === id);
    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.email === email);
    return foundUser;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, data, {
      id: uuid(),
      is_provider: data.is_provider || false,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}

export default FakeUsersRepository;
