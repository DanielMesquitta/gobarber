import { isEqual, getMonth, getYear } from 'date-fns';
import getDate from 'date-fns/getDate';
import { v4 as uuid } from 'uuid';

import {
  ICreateAppointmentDTO,
  IFindProviderScheduleByDayDTO,
  IFindProviderScheduleByMonthDTO,
} from '@modules/appointments/dtos';
import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import { IAppointmentsRepository } from '@modules/appointments/repositories';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findProviderScheduleByDay({
    provider_id,
    year,
    month,
    day,
  }: IFindProviderScheduleByDayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) === month &&
        getDate(appointment.date) === day
    );
    return appointments;
  }

  public async findProviderScheduleByMonth({
    provider_id,
    month,
    year,
  }: IFindProviderScheduleByMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) === month &&
        getYear(appointment.date) === year
    );
    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), provider_id, date });
    this.appointments.push(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );
    return foundAppointment;
  }
}

export default AppointmentsRepository;
