import { UserToken } from '@modules/users/infra/typeorm/entities';

export interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken | undefined>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
