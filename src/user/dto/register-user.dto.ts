import { IsEmail, IsNotEmpty } from 'class-validator';
import { Rol } from '../../rol/rol.entity';
import { ApiProperty } from '@nestjs/swagger';
/**
 * DTO para la creación de un nuevo usuario.
 */
export class CreateUserDto {
  /**
   * Email del usuario.
   */
    @ApiProperty({ description: 'Nombre del usuario', example: 'jon@hotmail.com' })
    @IsNotEmpty()
    @IsEmail()
      email: string;
    /**
   * Contraseña del usuario.
   */
    @ApiProperty({ description: 'Contraseña del usuario', example: 'secretpassword' })
    @IsNotEmpty()
      password: string;

    /**
   * Rol del usuario.
   */
    @ApiProperty({ description: 'Rol del usuario', example: '1' })
    @IsNotEmpty()
      rol: Rol;
    /**
   * Nombre del usuario.
   */
    @ApiProperty({ description: 'Nombre del usuario', example: 'John' })
    @IsNotEmpty()
      nombre: string;
    /**
   * Cédula del usuario.
   */
    @ApiProperty({ description: 'Cédula del usuario', example: '1234567890' })
    @IsNotEmpty()
      cedula: string;
    /**
   * Apellido del usuario.
   */
    @ApiProperty({ description: 'Apellido del usuario', example: 'Doe' })
    @IsNotEmpty()
      apellido: string;
    /**
   * Dirección del usuario.
   */
    @ApiProperty({ description: 'Dirección del usuario', example: '123 Main St' })
    @IsNotEmpty()
      direccion: string;
}
