import { v4 as uuid } from 'uuid';

import { UserToken } from '@modules/users/infra/typeorm/entities';
import { IUserTokensRepository } from '@modules/users/repositories';

class FakeUserTokensRepository implements IUserTokensRepository {
  private tokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const token = new UserToken();
    Object.assign(token, {
      id: uuid(),
      token: uuid(),
      user_id,
      updated_at: new Date(),
      created_at: new Date(),
    });
    this.tokens.push(token);
    return token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const foundToken = this.tokens.find(
      (searchedToken) => searchedToken.token === token
    );
    return foundToken;
  }
}

export default FakeUserTokensRepository;
