import { FakeUsersRepository } from '@modules/users/repositories/fakes';

import { ListProvidersService } from '.';

describe('ListProviders', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let listProviders: ListProvidersService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers without including the current logged one', async () => {
    /**
     * Providers
     */
    const provider1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@example.com',
      password_hash: '123456',
      is_provider: true,
    });
    const provider2 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password_hash: '123456',
      is_provider: true,
    });

    /**
     * User that should not be listed
     */
    await fakeUsersRepository.create({
      name: 'Janie Doe',
      email: 'janiedoe@example.com',
      password_hash: '123456',
    });

    /**
     * Provider that should not be listed
     */
    const loggedProvider = await fakeUsersRepository.create({
      name: 'Richard Roe',
      email: 'richardroe@example.com',
      password_hash: '123456',
      is_provider: true,
    });

    const providers = await listProviders.execute({
      not_included_user_id: loggedProvider.id,
    });
    expect(providers).toEqual([provider1, provider2]);
  });

  it('should be able to list all providers', async () => {
    /**
     * Providers
     */
    const provider1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@example.com',
      password_hash: '123456',
      is_provider: true,
    });
    const provider2 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password_hash: '123456',
      is_provider: true,
    });

    /**
     * User that should not be listed
     */
    await fakeUsersRepository.create({
      name: 'Janie Doe',
      email: 'janiedoe@example.com',
      password_hash: '123456',
    });
    const providers = await listProviders.execute();
    expect(providers).toEqual([provider1, provider2]);
  });

  it("should return an empty array if there isn't any providers", async () => {
    const providers = await listProviders.execute();
    expect(providers).toEqual([]);
  });
});
