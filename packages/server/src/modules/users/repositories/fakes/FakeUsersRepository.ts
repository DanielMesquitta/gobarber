import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '@modules/users/dtos';
import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

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
    Object.assign(user, { id: uuid() }, data);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}

export default FakeUsersRepository;
