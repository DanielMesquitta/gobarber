import { FakeUsersRepository } from '@modules/users/repositories/fakes';
import { FakeStorageProvider } from '@shared/container/providers/StorageProvider/fakes';

import { UpdateUserAvatarService } from '.';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      filename: 'avatar.jpg',
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
});
