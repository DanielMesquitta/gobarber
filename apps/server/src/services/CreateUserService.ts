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
    const appointment = userRepository.create({ name, email, password });
    await userRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
