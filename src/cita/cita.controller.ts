import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('cita')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  /**
   * Crea una nueva cita.
   *
   * @param {CreateCitaDto} createCitaDto - Datos para crear una nueva cita.
   * @returns {Promise<any>} - La cita creada.
   */
  @ApiOperation({ summary: 'Crea una cita' })
  @ApiBody({
    type: CreateCitaDto,
    description: 'Datos para crear una nueva cita',
  })
  @ApiResponse({
    status: 201,
    description: 'La cita ha sido creada correctamente',
  })
  @Post()
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citaService.create(createCitaDto);
  }

  /**
   * Obtiene la lista de citas asociadas a un usuario por su ID.
   *
   * @param {number} userId - ID del usuario.
   * @returns {Promise<any>} - Lista de citas encontradas.
   */
  @ApiOperation({ summary: 'Lista de citas' })
  @ApiParam({ name: 'user_id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de citas encontradas' })
  @Get(':user_id')
  findAllById(@Param('user_id') userId: number) {
    return this.citaService.findAllById(userId);
  }

  /**
   * Busca la última cita por su ID.
   *
   * @param {string} id - ID de la cita.
   * @returns {Promise<any>} - La última cita encontrada.
   */
  @ApiOperation({ summary: 'Busca la última cita' })
  @ApiParam({ name: 'id', description: 'ID de la cita' })
  @ApiResponse({ status: 200, description: 'La última cita encontrada' })
  @Get('last/:id')
  findLastOne(@Param('id') id: string) {
    return this.citaService.findLastOne(+id);
  }
}
