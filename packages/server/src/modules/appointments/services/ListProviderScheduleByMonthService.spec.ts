import { v4 as uuid } from 'uuid';

import { FakeAppointmentsRepository } from '@modules/appointments/repositories/fakes';

import { ListProviderScheduleByMonthService } from '.';

describe('ListProviderScheduleByMonth', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let listProviderScheduleByMonth: ListProviderScheduleByMonthService;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderScheduleByMonth = new ListProviderScheduleByMonthService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list a provider month schedule', async () => {
    const provider_id = uuid();
    const scheduledAppointments = [];

    /**
     * Set Date.now() to be always "2021-05-19"
     */
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 4, 19).getTime();
    });

    /**
     * Schedule appointments at "2021-05-20 08:00:00"
     * until "2021-05-20 17:00:00"
     */
    for (let hour = 8; hour < 18; hour += 1) {
      scheduledAppointments.push(
        fakeAppointmentsRepository.create({
          provider_id,
          date: new Date(2021, 4, 20, hour, 0, 0),
        })
      );
    }
    await Promise.all(scheduledAppointments);

    /**
     * Schedule appointment at "2021-05-21 08:00:00"
     */
    await fakeAppointmentsRepository.create({
      provider_id,
      date: new Date(2021, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderScheduleByMonth.execute({
      provider_id,
      year: 2021,
      month: 4,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 18, available: false },
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
      ])
    );
  });
});
