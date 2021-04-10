import addHours from 'date-fns/addHours';

import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes';
import {
  FakeUsersRepository,
  FakeUserTokensRepository,
} from '@modules/users/repositories/fakes';
import { AppError } from '@shared/errors';

import { ResetPasswordService } from '.';

describe('ResetPassword', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeUserTokensRepository: FakeUserTokensRepository;
  let resetPasswordService: ResetPasswordService;
  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it('should be able to change password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const execute = jest.spyOn(resetPasswordService, 'execute');
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    const oldPassword = '123456';
    const newPassword = '12345678';
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: oldPassword,
    });
    const { token } = await fakeUserTokensRepository.generate(user.id);
    const resetPasswordData = {
      token,
      password: newPassword,
    };
    await resetPasswordService.execute(resetPasswordData);
    expect(generateToken).toBeCalledWith(user.id);
    expect(generateHash).toBeCalledWith(newPassword);
    expect(execute).toBeCalledWith(resetPasswordData);
    expect(user.password_hash).toBe('12345678');
  });

  it('should not be able to change password with invalid token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'invalid-token',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change a non-existing user password', async () => {
    const newPassword = '12345678';
    const { token } = await fakeUserTokensRepository.generate(
      'invalid-user-id'
    );
    await expect(
      resetPasswordService.execute({
        token,
        password: newPassword,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change password if token is expired (expiration happens after 2 hours)', async () => {
    const oldPassword = '123456';
    const newPassword = '12345678';
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: oldPassword,
    });
    const { token } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = Number(addHours(new Date(), 3));
      return customDate;
    });
    await expect(
      resetPasswordService.execute({ token, password: newPassword })
    ).rejects.toBeInstanceOf(AppError);
  });
});
