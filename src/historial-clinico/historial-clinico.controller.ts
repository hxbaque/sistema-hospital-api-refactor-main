import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { HistorialClinicoService } from './historial-clinico.service';
import { UpdateHistorialClinicoDto } from './dto/update-historial-clinico.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { HistorialClinico } from './entities/historial-clinico.entity';

/**
 * Controlador para manejar las operaciones relacionadas con los historiales clínicos.
 */
@Controller('historial-clinico')
export class HistorialClinicoController {
  constructor (private readonly historialClinicoService: HistorialClinicoService) { }

  /**
   * Obtener un historial clínico por su ID.
   * @param id ID del historial clínico.
   * @returns El historial clínico encontrado.
   */
  @ApiOperation({ summary: 'Obtener un historial clínico por su ID' })
  @ApiParam({ name: 'id', description: 'ID del historial clínico' })
  @ApiResponse({ status: 200, description: 'El historial clínico encontrado', type: HistorialClinico })
  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.historialClinicoService.findOne(+id);
  }
  /**
   * Actualizar un historial clínico.
   * @param id ID del historial clínico.
   * @param updateHistorialClinicoDto Datos actualizados del historial clínico.
   * @returns El historial clínico actualizado.
   */
  @ApiOperation({ summary: 'Actualizar un historial clínico' })
  @ApiParam({ name: 'id', description: 'ID del historial clínico' })
  @ApiBody({ type: UpdateHistorialClinicoDto })
  @ApiResponse({ status: 200, description: 'El historial clínico ha sido actualizado exitosamente', type: HistorialClinico })
  @Put(':id')
  update (@Param('id') id: string, @Body() updateHistorialClinicoDto: UpdateHistorialClinicoDto) {
    return this.historialClinicoService.update(+id, updateHistorialClinicoDto);
  }
  /**
   * Eliminar un historial clínico.
   * @param id ID del historial clínico.
   * @returns Mensaje de éxito después de eliminar el historial clínico.
   */
  @ApiOperation({ summary: 'Eliminar un historial clínico' })
  @ApiParam({ name: 'id', description: 'ID del historial clínico' })
  @ApiResponse({ status: 200, description: 'El historial clínico ha sido eliminado exitosamente' })
  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.historialClinicoService.remove(+id);
  }
}
