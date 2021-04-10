import {
  endOfDay,
  getDate,
  getDaysInMonth,
  isBefore,
  startOfDay,
} from 'date-fns';
import { injectable, inject } from 'tsyringe';

import { IAppointmentsRepository } from '@modules/appointments/repositories';
import { generateRange } from '@shared/helpers';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderScheduleByMonthService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findProviderScheduleByMonth(
      {
        provider_id,
        year,
        month,
      }
    );
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month));
    const monthDays = generateRange(1, numberOfDaysInMonth);
    const schedule: IResponse = monthDays.map((day) => {
      const appointmentsInDay = appointments.filter(
        (appointment) => getDate(appointment.date) === day
      );
      const now = new Date(Date.now());
      const currentDayInSelectedMonth = new Date(year, month, day);
      return {
        day,
        /**
         * appointmentsInDay must be lower than 10 to be
         * available because it will be only allowed to
         * have 10 appointments per day (from 8AM to 5PM)
         */
        available:
          appointmentsInDay.length < 10 &&
          isBefore(startOfDay(now), endOfDay(currentDayInSelectedMonth)),
      };
    });
    return schedule;
  }
}

export default ListProviderScheduleByMonthService;
