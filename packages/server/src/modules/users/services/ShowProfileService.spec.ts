import { FakeUsersRepository } from '@modules/users/repositories/fakes';
import { AppError } from '@shared/errors';

import { ShowProfileService } from '.';

describe('ShowProfile', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let showProfile: ShowProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@example.com',
      password_hash: '123456',
    });
    const foundUser = await showProfile.execute({
      user_id: user.id,
    });
    expect(foundUser).toBe(user);
  });

  it('should not be able to show profile with invalid user id', async () => {
    await expect(
      showProfile.execute({
        user_id: 'invalid-user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
