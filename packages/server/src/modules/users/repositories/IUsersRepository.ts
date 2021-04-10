import { ICreateUserDTO, IFindAllProvidersDTO } from '@modules/users/dtos';
import { User } from '@modules/users/infra/typeorm/entities';

export interface IUsersRepository {
  findAllProviders(data?: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
