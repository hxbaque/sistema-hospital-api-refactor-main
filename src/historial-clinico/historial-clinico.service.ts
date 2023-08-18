import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistorialClinicoDto } from './dto/create-historial-clinico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialClinico } from './entities/historial-clinico.entity';
import { HistorialClinicoRepository } from './historial-clinico.repository';
// import { UserService } from 'src/user/user.service';

/**
 * Servicio para manejar las operaciones relacionadas con los historiales clínicos.
 */
@Injectable()
export class HistorialClinicoService {
  constructor (
    @InjectRepository(HistorialClinico)
    private historialRepository: HistorialClinicoRepository,
    // private asd: UserService
  ) {}

  /**
   * Obtener un historial clínico por su ID.
   * @param id ID del historial clínico.
   * @returns El historial clínico encontrado.
   */
  findOne (id: number) {
    return `This action returns a #${id} historialClinico`;
  }
  /**
   * Actualizar un historial clínico.
   * @param id ID del historial clínico.
   * @param updatedData Datos actualizados del historial clínico.
   * @returns El historial clínico actualizado.
   * @throws `NotFoundException` si no se encuentra el historial clínico.
   */
  async update (id: number, updatedData: Partial<HistorialClinico>) {
    const historialClinico = await this.historialRepository.findOne(
      {
        where: { id },
      }
    );
    if (!historialClinico) {
      throw new NotFoundException('Historial clínico no encontrado');
    }
    Object.assign(historialClinico, updatedData);
    return this.historialRepository.save(historialClinico);
  }
  /**
   * Eliminar un historial clínico.
   * @param id ID del historial clínico.
   * @returns Mensaje de éxito después de eliminar el historial clínico.
   * @throws `NotFoundException` si no se encuentra el historial clínico.
   */
  async remove (id: number) {
    const historialClinico = await this.historialRepository.findOne({
      where: { id },
    });
    if (!historialClinico) {
      throw new NotFoundException('Historial clínico no encontrado');
    }
    return this.historialRepository.remove(historialClinico);
  }
  /**
   * Guardar un nuevo historial clínico.
   * @param historial Datos del historial clínico a guardar.
   */
  async save (historial:CreateHistorialClinicoDto){
    await this.historialRepository.save(historial);
  }
}
