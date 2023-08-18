/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConsultorioDto } from './dto/create-consultorio.dto';
import { UpdateConsultorioDto } from './dto/update-consultorio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultorio } from './entities/consultorio.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ConsultoriosService {
  constructor(
    @InjectRepository(Consultorio)
    private consultorioRepository: Repository<Consultorio>,
    private userService: UserService,
  ) {}

  /**
   * Crea un nuevo consultorio.
   *
   * @param {CreateConsultorioDto} createConsultorioDto - Datos para crear el consultorio.
   * @returns {Promise<Consultorio>}
   */
  async create(
    createConsultorioDto: CreateConsultorioDto,
  ): Promise<Consultorio> {
    try {
      const id = createConsultorioDto.medicoId;
      const medico = await this.userService.findById(id);
      if (medico.rol.id !== 2) {
        throw new BadRequestException('Esa cuenta no pertenece a un medico');
      }
      const consultorio = new Consultorio();
      consultorio.especialidad = createConsultorioDto.especialidad;
      consultorio.medico = medico;
      const newConsultorio = await this.consultorioRepository.save(consultorio);
      return newConsultorio;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El medico ya pertenece a otro consultorio',
        );
      }
    }
  }

  /**
   * Obtiene todos los consultorios.
   *
   * @returns {Promise<Consultorio[]>}
   */
  async findAll(): Promise<Consultorio[]> {
    const consultorios = await this.consultorioRepository.find({
      relations: ['medico'],
    });

    const consultoriosSinPassword = consultorios.map((consultorio) => {
      const { medico, ...restoDatos } = consultorio;
      const medicoSinPassword = { ...medico, password: undefined };
      return { ...restoDatos, medico: medicoSinPassword };
    });

    return consultoriosSinPassword;
  }

  /**
   * Obtiene un consultorio por su ID.
   *
   * @param {number} id - ID del consultorio.
   * @returns {Promise<Consultorio>}
   * @throws {HttpException} - Si el consultorio no se encuentra.
   */
  async findOne(id: number): Promise<Consultorio> {
    const consultorios = await this.consultorioRepository.find({
      relations: ['medico', 'medico.rol'],
      where: {
        id,
      },
    });
    const consultorio = consultorios[0];

    if (!consultorio) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const { medico, ...restoDatos } = consultorio;
    const medicoSinPassword = { ...medico, password: undefined };
    return { ...restoDatos, medico: medicoSinPassword };
  }

  /**
   * Actualiza un consultorio existente.
   *
   * @param {number} consultorioId - ID del consultorio.
   * @param {UpdateConsultorioDto} updateConsultorioDto - Datos para actualizar el consultorio.
   * @returns {Promise<Consultorio>}
   */
  async update(
    consultorioId: number,
    updateConsultorioDto: UpdateConsultorioDto,
  ): Promise<Consultorio> {
    try {
      const consultorio = await this.consultorioRepository.findOne({
        relations: ['medico'],
        where: { id: consultorioId },
      });
      if (!consultorio) {
        throw new NotFoundException(
          `Consultorio with ID ${consultorioId} not found`,
        );
      }
      const id = updateConsultorioDto.medicoId;
      const medico = await this.userService.findById(id);
      if (medico.rol.id !== 2) {
        throw new BadRequestException('Esa cuenta no pertenece a un medico');
      }

      consultorio.especialidad = updateConsultorioDto.especialidad;
      consultorio.medico = medico;

      return await this.consultorioRepository.save(consultorio);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El consultorio ya existe');
      }
    }
  }

  /**
   * Obtiene los usuarios sin consultorio.
   *
   * @returns {Promise<any>}
   */
  async findUsuariosSinConsultorio(): Promise<any> {
    const consultorios = await this.consultorioRepository.find({
      relations: ['medico'],
    });
    const consultorioIds = consultorios.map(
      (consultorio) => consultorio.medico.id,
    );
    const usuariosSinConsultorio = await this.userService.findUsuariosSinConsultorio(consultorioIds);
    return usuariosSinConsultorio;
  }

  /**
   * Elimina un consultorio.
   *
   * @param {number} id - ID del consultorio.
   * @returns {Promise<any>}
   */
  remove(id: number): Promise<any> {
    return this.consultorioRepository.delete(id);
  }
}
