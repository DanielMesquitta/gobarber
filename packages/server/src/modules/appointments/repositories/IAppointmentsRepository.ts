import { ICreateAppointmentDTO } from '@modules/appointments/dtos';
import { Appointment } from '@modules/appointments/infra/typeorm/entities';

export interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}
