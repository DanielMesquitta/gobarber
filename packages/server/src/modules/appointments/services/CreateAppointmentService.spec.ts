import { v4 as uuid } from 'uuid';

import { FakeAppointmentsRepository } from '@modules/appointments/repositories/fakes';
import { AppError } from '@shared/errors';

import { CreateAppointmentService } from '.';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
    const provider_id = uuid();
    const appointment = await createAppointmentService.execute({
      provider_id,
      date: new Date(),
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider_id);
  });

  it('should not be able to create two appointments in the same time/date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
    const date = new Date();
    await createAppointmentService.execute({
      provider_id: uuid(),
      date,
    });
    expect(
      createAppointmentService.execute({
        provider_id: uuid(),
        date,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
