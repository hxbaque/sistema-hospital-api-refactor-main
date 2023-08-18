import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultorioDto {
  /**
   * Especialidad del consultorio.
   *
   * @type {string}
   */
  @ApiProperty({
    example: 'Especialidad del consultorio',
    description: 'Especialidad del consultorio',
    required: true,
  })
  @IsNotEmpty({ message: 'La especialidad no debe estar vacia' })
    especialidad: string;

  /**
   * ID del médico asociado al consultorio.
   *
   * @type {number}
   */
  @ApiProperty({ example: 1, description: 'ID del médico', required: true })
  @IsNotEmpty({ message: 'El medico no debe estar vacio' })
    medicoId: number;
}
