import { IsEmail, IsNotEmpty } from 'class-validator';
import { Rol } from '../../rol/rol.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicoDto {
  /**
   * Email del medico.
   *
   * @type {string}
   */
  @ApiProperty({ description: 'Email del medico', example: 'example@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
    email: string;

  /**
   * Contraseña del medico.
   *
   * @type {string}
   */
  @ApiProperty({ description: 'Contraseña', example: 'password123' })
  @IsNotEmpty()
    password: string;

  /**
   * Rol del medico.
   *
   * @type {Rol}
   */
  @ApiProperty({ description: 'Rol del medico', example: 'admin' })
  @IsNotEmpty()
    rol: Rol;

  /**
   * Nombre del medico.
   *
   * @type {string}
   */
  @ApiProperty({ description: 'Nombre del medico', example: 'John' })
  @IsNotEmpty()
    nombre: string;

  /**
   * Cedula del medico.
   *
   * @type {string}
   */
  @ApiProperty({ description: 'Cedula del medico', example: '1234567890' })
  @IsNotEmpty()
    cedula: string;

  /**
   * Apellido del medico.
   *
   * @type {string}
   */
  @ApiProperty({ description: 'Apellido del medico', example: 'Doe' })
  @IsNotEmpty()
    apellido: string;

  /**
   * Dirección del medico.
   *
   * @type {string}
   */
  @ApiProperty({ description: 'Dirección del medico', example: '123 Street' })
  @IsNotEmpty()
    direccion: string;
}
