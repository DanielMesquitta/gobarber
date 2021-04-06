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
    });
    this.tokens.push(token);
    return token;
  }
}

export default FakeUserTokensRepository;
