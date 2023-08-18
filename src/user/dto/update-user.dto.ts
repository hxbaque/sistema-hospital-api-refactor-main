import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty } from 'class-validator';
/**
 * DTO para la actualización de un usuario.
 */
export class UpdateUserDto {
    /**
   * Nombre del usuario.
   */
    @ApiProperty({ description: 'Nombre del usuario', example: 'Charlie' })
    @IsNotEmpty()
      nombre: string;
    /**
   * Apellido del usuario.
   */
    @ApiProperty({ description: 'Apellido del usuario', example: 'Rodríguez' })
    @IsNotEmpty()
      apellido: string;
}
