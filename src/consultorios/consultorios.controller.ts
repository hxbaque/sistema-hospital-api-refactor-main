import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ConsultoriosService } from './consultorios.service';
import { CreateConsultorioDto } from './dto/create-consultorio.dto';
import { UpdateConsultorioDto } from './dto/update-consultorio.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('consultorios')
export class ConsultoriosController {
  constructor(private readonly consultoriosService: ConsultoriosService) {}

  /**
   * Crea un nuevo consultorio.
   *
   * @param {CreateConsultorioDto} createConsultorioDto - Datos para crear el consultorio.
   * @returns {Promise<any>}
   */
  @Post()
  @ApiOperation({ summary: 'Crear un consultorio' })
  @ApiBody({ type: CreateConsultorioDto })
  @ApiResponse({
    status: 201,
    description: 'El consultorio ha sido creado exitosamente',
  })
  create(@Body() createConsultorioDto: CreateConsultorioDto) {
    return this.consultoriosService.create(createConsultorioDto);
  }

  /**
   * Obtiene los nombres de los médicos sin consultorio.
   *
   * @returns {Promise<any>}
   */
  @ApiOperation({ summary: 'Obtiene los nombres de los medicos' })
  @Get('medicos/nombres')
  @ApiResponse({
    status: 200,
    description: 'Obtiene los nombres de los médicos sin consultorio',
  })
  findAllNamesMedicos() {
    return this.consultoriosService.findUsuariosSinConsultorio();
  }

  /**
   * Obtiene todos los consultorios.
   *
   * @returns {Promise<any>}
   */
  @ApiOperation({ summary: 'Obtiene los consultorios' })
  @Get()
  @ApiResponse({ status: 200, description: 'Obtiene todos los consultorios' })
  findAll() {
    return this.consultoriosService.findAll();
  }

  /**
   * Obtiene un consultorio por su ID.
   *
   * @param {string} id - ID del consultorio.
   * @returns {Promise<any>}
   */
  @ApiOperation({ summary: 'Obtiene los consultorios por Id' })
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Obtiene un consultorio por su ID' })
  findOne(@Param('id') id: string) {
    return this.consultoriosService.findOne(+id);
  }

  /**
   * Actualiza un consultorio existente.
   *
   * @param {string} id - ID del consultorio.
   * @param {UpdateConsultorioDto} updateConsultorioDto - Datos para actualizar el consultorio.
   * @returns {Promise<any>}
   */
  @ApiOperation({ summary: 'Actualiza el consultorio' })
  @Put(':id')
  @ApiBody({ type: UpdateConsultorioDto })
  @ApiResponse({
    status: 200,
    description: 'El consultorio ha sido actualizado exitosamente',
  })
  update(
    @Param('id') id: string,
    @Body() updateConsultorioDto: UpdateConsultorioDto,
  ) {
    return this.consultoriosService.update(+id, updateConsultorioDto);
  }

  /**
   * Elimina un consultorio existente.
   *
   * @param {string} id - ID del consultorio.
   * @returns {Promise<any>}
   */
  @ApiOperation({ summary: 'Elimina el consultorio' })
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'El consultorio ha sido eliminado exitosamente',
  })
  remove(@Param('id') id: string) {
    return this.consultoriosService.remove(+id);
  }
}
