import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidad que representa un rol en el sistema.
 */
@Entity()
export class Rol{
    /**
   * ID del rol.
   */
    @ApiProperty({ example: 1, description: 'ID del rol' })
    @PrimaryGeneratedColumn()
      id: number;
    /**
   * Nombre del rol.
   */
    @ApiProperty({ example: 'administrador', description: 'Nombre del rol' })
    @Column({ length: 45 })
      nombre: string;
}
