import { v4 as uuid } from 'uuid';

import { FakeAppointmentsRepository } from '@modules/appointments/repositories/fakes';

import { ListProviderScheduleByDayService } from '.';

describe('ListProviderScheduleByMonth', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let listProviderScheduleByDay: ListProviderScheduleByDayService;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderScheduleByDay = new ListProviderScheduleByDayService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list a provider day schedule', async () => {
    const provider_id = uuid();
    const scheduledAppointments = [];

    /**
     * Set Date.now() to be always "2021-05-20 08:00:00"
     */
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 4, 20, 8).getTime();
    });

    /**
     * Schedule appointments at "2021-05-20 10:00:00"
     * and "2021-05-20 11:00:00"
     */
    for (let hour = 10; hour < 12; hour += 1) {
      scheduledAppointments.push(
        fakeAppointmentsRepository.create({
          provider_id,
          date: new Date(2021, 4, 20, hour, 0, 0),
        })
      );
    }
    await Promise.all(scheduledAppointments);

    /**
     * Schedule appointment at "2021-05-21 10:00:00"
     */
    await fakeAppointmentsRepository.create({
      provider_id,
      date: new Date(2021, 4, 21, 10, 0, 0),
    });

    const availability = await listProviderScheduleByDay.execute({
      provider_id,
      year: 2021,
      month: 4,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
      ])
    );
  });
});
