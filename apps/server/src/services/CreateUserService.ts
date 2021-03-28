import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import { User } from '~/models';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateAppointmentService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const emailIsAlreadyRegistered = await userRepository.findOne({
      where: { email },
    });
    if (emailIsAlreadyRegistered) {
      throw new Error('This email is already registered');
    }
    const password_hash = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password_hash,
    });
    await userRepository.save(user);
    delete user.password_hash;
    return user;
  }
}

export default CreateAppointmentService;
