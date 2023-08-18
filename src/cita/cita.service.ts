import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';
import { Consultorio } from 'src/consultorios/entities/consultorio.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private citaRepository: Repository<Cita>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Consultorio)
    private consultorioRepository: Repository<Consultorio>,
  ) {}
  async create(createCitaDto: CreateCitaDto) {
    const { userId, consultorioId, fecha, hora } = createCitaDto;
    const consultorio = await this.consultorioRepository.findOne({
      where: { id: consultorioId },
    });
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user || !consultorio) {
      throw new BadRequestException('Usuario o consultorio no encontrado');
    }
    const cita = new Cita();
    cita.fecha = fecha;
    cita.user = user;
    cita.hora = hora;
    cita.consultorios = [consultorio];
    return this.citaRepository.save(cita);
  }

  async findAllById(userId: number): Promise<Cita[]> {
    return this.citaRepository.find({
      relations: ['consultorios'],
      where: { user: { id: userId } },
    });
  }

  findLastOne(userId: number) {
    return this.citaRepository.find({
      relations: ['consultorios'],
      where: { user: { id: userId } },
      order: { id: 'DESC' },
      take: 1,
    });
  }
}
