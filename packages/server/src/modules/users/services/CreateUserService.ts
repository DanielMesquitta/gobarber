import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities';
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
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailIsAlreadyRegistered = await this.usersRepository.findByEmail(
      email
    );
    if (emailIsAlreadyRegistered) {
      throw new AppError('This email is already registered');
    }
    const password_hash = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
    delete user.password_hash;
    return user;
  }
}

export default CreateAppointmentService;
