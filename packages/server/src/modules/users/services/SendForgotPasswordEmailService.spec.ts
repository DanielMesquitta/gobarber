import {
  FakeUsersRepository,
  FakeUserTokensRepository,
} from '@modules/users/repositories/fakes';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes';
import { AppError } from '@shared/errors';

import { SendForgotPasswordEmailService } from '.';

describe('SendForgotPasswordEmail', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeUserTokensRepository: FakeUserTokensRepository;
  let fakeMailProvider: FakeMailProvider;
  let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it('should be able to send recover password email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const email = 'johndoe@example.com';
    await fakeUsersRepository.create({
      name: 'John Doe',
      email,
      password_hash: '123456',
    });
    await sendForgotPasswordEmailService.execute({ email });
    expect(sendMail).toBeCalled();
  });

  it('should not be able to recover a non existing user password', async () => {
    const email = 'johndoe@example.com';
    await expect(
      sendForgotPasswordEmailService.execute({ email })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');
    const email = 'johndoe@example.com';
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email,
      password_hash: '123456',
    });
    await sendForgotPasswordEmailService.execute({ email });
    expect(generate).toBeCalledWith(user.id);
  });
});
