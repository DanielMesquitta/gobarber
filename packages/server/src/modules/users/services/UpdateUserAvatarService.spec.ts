import { FakeUsersRepository } from '@modules/users/repositories/fakes';
import { FakeStorageProvider } from '@shared/container/providers/StorageProvider/fakes';
import { AppError } from '@shared/errors';

import { UpdateUserAvatarService } from '.';

describe('UpdateUserAvatar', () => {
  let fakeStorageProvider: FakeStorageProvider;
  let fakeUsersRepository: FakeUsersRepository;
  let updateUserAvatarService: UpdateUserAvatarService;

  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );
  });

  it('should be able to update user avatar', async () => {
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

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        filename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the old avatar before uploading a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      filename: 'avatar.jpg',
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      filename: 'new-avatar.jpg',
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('new-avatar.jpg');
  });
});
