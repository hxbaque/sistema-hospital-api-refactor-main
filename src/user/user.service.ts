import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/register-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, In, Not } from 'typeorm';
import { HistorialClinico } from '../historial-clinico/entities/historial-clinico.entity';
import { HistorialClinicoService } from '../historial-clinico/historial-clinico.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateMedicoDto } from '../medicos/dto/update-medico.dto';

/**
 * Servicio para gestionar usuarios.
 */
@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: UserRepository,
    private historialService: HistorialClinicoService,
    // private historialRepository: HistorialClinicoRepository
  ) {}
  /**
   * Crea un nuevo usuario.
   * @param createUserDto Los datos del usuario a crear.
   * @returns El usuario creado.
   */
  async create (createUserDto: CreateUserDto) {
    const usuario = this.userRepository.create(createUserDto);
    const historialClinico = new HistorialClinico();
    await this.historialService.save(historialClinico);
    usuario.historialClinico = historialClinico;
    await this.userRepository.save(usuario);
    return usuario;

  }
  /**
   * Busca usuarios por nombre de usuario.
   * @param email El nombre de usuario a buscar.
   * @returns Una lista de usuarios encontrados.
   */
  findByUsername (email: string) {
    return this.userRepository.find({
      relations: ['rol'],
      where: { email },
    });
  }

  /**
   * Busca un usuario por su ID.
   * @param id El ID del usuario.
   * @returns El usuario encontrado.
   */
  findById (id: number): Promise<User> {
    return this.userRepository.findOne({
      relations: ['rol', 'historialClinico'],
      where: { id },
    });
  }

  /**
   * Busca un médico por su ID.
   * @param id El ID del médico.
   * @returns El médico encontrado.
   */
  findMedicoById (id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
  /**
   * Obtiene todos los pacientes.
   * @returns Una lista de pacientes.
   */
  findAllPacientes () {
    return this.userRepository.find({
      where: { rol: Equal(1) },
    });
  }
  /**
   * Obtiene todos los médicos.
   * @returns Una lista de médicos.
   */
  findAllMedicos () {
    return this.userRepository.find({
      where: { rol: Equal(2) },
    });
  }
  /**
   * Busca usuarios que no están asignados a consultorios específicos.
   * @param consultorioIds Los IDs de los consultorios.
   * @returns Una lista de usuarios sin consultorio asignado.
   */
  async findUsuariosSinConsultorio (consultorioIds: number[]){
    return await this.userRepository.find({
      where: {
        id: Not(In(consultorioIds)),
        rol: Equal(2),
      },
    });
  }
  /**
   * Busca un usuario por su nombre de usuario.
   * @param email El nombre de usuario a buscar.
   * @returns El usuario encontrado.
   */
  findOneByUsername (email: string) {
    return this.userRepository.findOne({
      relations: ['rol'],
      where: { email } });
  }
  /**
   * Elimina un usuario por su ID.
   * @param id El ID del usuario a eliminar.
   */
  async remove (id: number) {
    const user = await this.userRepository.findOne({
      relations: ['historialClinico'],
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.userRepository.remove(user);
    await this.historialService.remove(user.historialClinico.id);
  }
  /**
   * Actualiza el nombre y apellido de un usuario.
   * @param userId El ID del usuario a actualizar.
   * @param updateUserDto Los datos de actualización.
   * @returns El usuario actualizado.
   */
  async updateNombreYApellido (userId: number, updateUserDto:UpdateUserDto): Promise<User> {
    // Obtener el usuario de la base de datos
    const user = await this.userRepository.findOne(
      {
        where: { id: userId },
      }
    );

    // Realizar la actualización del nombre y apellido
    user.nombre = updateUserDto.nombre;
    user.apellido = updateUserDto.apellido;

    // Guardar los cambios en la base de datos
    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }
  /**
   * Actualiza los datos de un médico.
   * @param id El ID del médico a actualizar.
   * @param updateMedicoDto Los datos de actualización.
   */
  async updateMedico (id: number, updateMedicoDto: UpdateMedicoDto){
    return await this.userRepository.update(id, updateMedicoDto);
  }
}
