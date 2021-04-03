import { ICreateUserDTO } from '@modules/users/dtos';
import { User } from '@modules/users/infra/typeorm/entities';

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}
