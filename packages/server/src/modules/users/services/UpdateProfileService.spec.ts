import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes';
import { FakeUsersRepository } from '@modules/users/repositories/fakes';
import { AppError } from '@shared/errors';

import { UpdateProfileService } from '.';

describe('UpdateProfile', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let updateProfile: UpdateProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to update name and email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@example.com',
      password_hash: '123456',
    });
    const newName = 'Jane Doe';
    const newEmail = 'janedoe@example.com';
    await updateProfile.execute({
      user_id: user.id,
      name: newName,
      email: newEmail,
    });
    expect(user.name).toBe(newName);
    expect(user.email).toBe(newEmail);
  });

  it('should not be able to update email when it is already registered by another user', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    });
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password_hash: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    });
    const newPassword = '12345678';
    await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      old_password: '123456',
      password: newPassword,
    });
    expect(user.password_hash).toBe(newPassword);
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'janedoe@example.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with invalid old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        old_password: 'invalid-password',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update non-existing user profile', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'John Doe',
        email: 'jonhdoe@example.com',
        old_password: '123456',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
