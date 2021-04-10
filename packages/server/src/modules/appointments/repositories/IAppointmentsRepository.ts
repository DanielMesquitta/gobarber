import {
  ICreateAppointmentDTO,
  IFindProviderScheduleByMonthDTO,
  IFindProviderScheduleByDayDTO,
} from '@modules/appointments/dtos';
import { Appointment } from '@modules/appointments/infra/typeorm/entities';

export interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findProviderScheduleByMonth(
    data: IFindProviderScheduleByMonthDTO
  ): Promise<Appointment[]>;

  findProviderScheduleByDay(
    data: IFindProviderScheduleByDayDTO
  ): Promise<Appointment[]>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}
