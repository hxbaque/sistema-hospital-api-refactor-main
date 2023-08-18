import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCitaDto {
  /**
   * ID del usuario.
   *
   * @type {number}
   */
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  @IsNotEmpty() // Campo no puede estar vacío
  @IsNumber() // Debe ser un número
    userId: number;

  /**
   * ID del consultorio.
   *
   * @type {number}
   */
  @ApiProperty({ description: 'ID del consultorio', example: 1 })
  @IsNotEmpty() // Campo no puede estar vacío
  @IsNumber() // Debe ser un número
    consultorioId: number;

  /**
   * Fecha de la cita.
   *
   * @type {string}
   */
  @ApiProperty({ description: 'Fecha de la cita', example: '2023-06-15' })
  @IsNotEmpty() // Campo no puede estar vacío
  @IsDateString({}, { message: '¡El formato de fecha no es válido! Utilice el formato YYYY-MM-DD.' }) // Debe ser una fecha válida
    fecha: string;

  /**
   * Hora de la cita.
   *
   * @type {string}
   */
  @ApiProperty({ description: 'Hora de la cita', example: '09:00 AM' })
  @IsNotEmpty() // Campo no puede estar vacío
  @IsString() // Debe ser una cadena de texto
    hora: string;
}
