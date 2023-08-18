import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
/**
 * DTO para el inicio de sesión de usuario.
 */
export class LoginUserDto {
  /**
   * Correo electrónico del usuario.
   */
    @ApiProperty({ description: 'Correo electrónico del usuario', example: 'johndoe@example.com' })
    @IsNotEmpty()
    @IsEmail()
      email: string;
    /**
   * Contraseña del usuario.
   */
    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsNotEmpty()
      password: string;
}
