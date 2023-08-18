import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from './entities/user.entity';


/**
 * Controlador para las rutas relacionadas con los usuarios.
 * @class
 */
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) { }

  /**
   * Crea un nuevo usuario.
   * @param {CreateUserDto} createUserDto - Datos del usuario a crear.
   * @returns {Promise<User>} Usuario creado.
   */
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @Post()
  create (@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  /**
   * Obtiene todos los pacientes.
   * @returns {Promise<User[]>} Lista de todos los pacientes.
   */

  @ApiOperation({ summary: 'Obtener todos los pacientes' })
  @ApiResponse({ status: 200, description: 'Lista de todos los pacientes', type: User })
  @Get('pacientes')
  findAllPacientes (): Promise<User[]> {
    return this.userService.findAllPacientes();
  }

  /**
   * Obtiene todos los médicos.
   * @returns {Promise<User[]>} Lista de todos los médicos.
   */
  @ApiOperation({ summary: 'Obtener todos los medicos' })
  @ApiResponse({ status: 200, description: 'Lista de todos los medicos', type: User })
  @Get('allMedicos')
  findAllMedicos (): Promise<User[]> {
    return this.userService.findAllMedicos();
  }
  /*
    @Get('medicos/nombres')
    findAllNamesMedicos() {
      return this.userService.findAllNamesMedicos();
    }
  */
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  @Get('prueba')
  findOneById () {
    return this.userService.findById(16);
  }

  /**
   * Obtiene el historial de un usuario por su ID.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<User>} Historial del usuario.
   */
  @ApiOperation({ summary: 'Obtener historial por ID de usuario' })
  @ApiParam({ name: 'user_id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Historial del usuario', type: User })
  @Get('historial/:user_id')
  findHistorial (@Param('user_id') userId: string) {
    return this.userService.findById(+userId);
  }
  /**
   * Actualiza el nombre y apellido de un usuario.
   * @param {string} userId - ID del usuario.
   * @param {UpdateUserDto} updateUserDto - Datos actualizados del usuario.
   * @returns {Promise<User>} Usuario actualizado.
   */
  @ApiOperation({ summary: 'Actualizar nombre y apellido del usuario' })
  @ApiParam({ name: 'user_id', description: 'ID del usuario' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @Put(':user_id')
  updateNombreYApellido (@Param('user_id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateNombreYApellido(+userId, updateUserDto);
  }

  /**
   * Elimina un usuario por su ID.
   * @param {string} id - ID del usuario a eliminar.
   * @returns {Promise<void>}
   */
  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
