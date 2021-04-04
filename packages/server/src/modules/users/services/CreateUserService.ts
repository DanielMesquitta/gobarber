import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities';
import { IHashProvider } from '@modules/users/providers/HashProvider/models';
import { IUsersRepository } from '@modules/users/repositories';
import { AppError } from '@shared/errors';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailIsAlreadyRegistered = await this.usersRepository.findByEmail(
      email
    );
    if (emailIsAlreadyRegistered) {
      throw new AppError('This email is already registered');
    }
    const password_hash = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
    return user;
  }
}

export default CreateAppointmentService;
