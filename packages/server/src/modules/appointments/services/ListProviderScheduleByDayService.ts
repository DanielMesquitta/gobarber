import { getHours, isBefore, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import { IAppointmentsRepository } from '@modules/appointments/repositories';
import { generateRange } from '@shared/helpers';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderScheduleByDayService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findProviderScheduleByDay(
      {
        provider_id,
        year,
        month,
        day,
      }
    );
    const availableHours = generateRange(8, 17);
    const schedule = availableHours.map((hour) => {
      const hasAppointmentInThisHour =
        appointments.findIndex(
          (appointment) => getHours(appointment.date) === hour
        ) !== -1;
      const now = new Date(Date.now());
      const currentHourInSelectedDay = new Date(year, month, day, hour);
      return {
        hour,
        available:
          !hasAppointmentInThisHour &&
          isBefore(startOfHour(now), startOfHour(currentHourInSelectedDay)),
      };
    });
    return schedule;
  }
}

export default ListProviderScheduleByDayService;
