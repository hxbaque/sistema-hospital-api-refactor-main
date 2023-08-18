import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { UserService } from '../user/user.service';
import { hash } from 'bcrypt';
import { Rol } from '../rol/rol.entity';

@Injectable()
export class MedicosService {
  constructor(private userService: UserService) {}

  /**
   * Crea un nuevo médico.
   *
   * @param {CreateMedicoDto} createMedicoDto - Los datos para crear el médico.
   * @returns {Promise<any>} - El resultado de la creación del médico.
   * @throws {HttpException} - Si el correo ya existe.
   */
  async create(createMedicoDto: CreateMedicoDto) {
    const { email, password } = createMedicoDto;
    const usersExist = await this.userService.findOneByUsername(email);
    if (usersExist) {
      throw new HttpException('El correo ya existe', HttpStatus.CONFLICT);
    }
    const plainToHash = await hash(password, 10);
    const rol: Rol = { id: 2, nombre: 'medico' };
    createMedicoDto = { ...createMedicoDto, password: plainToHash, rol };
    return this.userService.create(createMedicoDto);
  }

  /**
   * Obtiene todos los médicos.
   *
   * @returns {Promise<any[]>} - La lista de médicos encontrados.
   */
  async findAll() {
    return await this.userService.findAllMedicos();
  }

  /**
   * Obtiene un médico por su ID.
   *
   * @param {number} id - ID del médico.
   * @returns {Promise<any>} - El médico encontrado.
   */
  async findOne(id: number) {
    return await this.userService.findMedicoById(id);
  }

  /**
   * Actualiza un médico.
   *
   * @param {number} id - ID del médico a actualizar.
   * @param {UpdateMedicoDto} updateMedicoDto - Los datos actualizados del médico.
   * @returns {Promise<any>} - El resultado de la actualización del médico.
   * @throws {BadRequestException} - Si la cuenta no pertenece a un médico.
   * @throws {BadRequestException} - Si el consultorio ya existe.
   */
  async update(id: number, updateMedicoDto: UpdateMedicoDto) {
    try {
      const medico = await this.userService.findById(id);
      if (medico.rol.id !== 2) {
        throw new BadRequestException('Esa cuenta no pertenece a un médico');
      }
      Object.assign(medico, updateMedicoDto);
      return this.userService.updateMedico(id, medico);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El consultorio ya existe');
      }
    }
  }

  /**
   * Elimina un médico.
   *
   * @param {number} id - ID del médico a eliminar.
   * @returns {Promise<void>}
   * @throws {NotFoundException} - Si no se encuentra el historial clínico.
   */
  async remove(id: number) {
    const medico = await this.userService.findById(id);
    if (!medico) {
      throw new NotFoundException('Historial clínico no encontrado');
    }
    return this.userService.remove(id);
  }
}
