import { startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';
import { Between, getRepository, Repository } from 'typeorm';

import {
  ICreateAppointmentDTO,
  IFindProviderScheduleByDayDTO,
  IFindProviderScheduleByMonthDTO,
} from '@modules/appointments/dtos';
import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import { IAppointmentsRepository } from '@modules/appointments/repositories';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findProviderScheduleByMonth({
    provider_id,
    month,
    year,
  }: IFindProviderScheduleByMonthDTO): Promise<Appointment[]> {
    const selectedDate = new Date(year, month);
    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Between(startOfMonth(selectedDate), endOfMonth(selectedDate)),
      },
    });
    return appointments;
  }

  public async findProviderScheduleByDay({
    provider_id,
    year,
    month,
    day,
  }: IFindProviderScheduleByDayDTO): Promise<Appointment[]> {
    const selectedDate = new Date(year, month, day);
    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Between(startOfDay(selectedDate), endOfDay(selectedDate)),
      },
    });
    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment> {
    const appointment = await this.ormRepository.findOne({
      where: { date },
    });
    return appointment;
  }
}

export default AppointmentsRepository;
