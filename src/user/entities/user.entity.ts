import { ApiProperty } from '@nestjs/swagger';
import { Cita } from '../../cita/entities/cita.entity';
import { HistorialClinico } from '../../historial-clinico/entities/historial-clinico.entity';
import { Rol } from '../../rol/rol.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
/**
 * Representa un usuario en el sistema.
 */
@Entity()
export class User {
  /**
   * Identificador único del usuario.
   */
  @PrimaryGeneratedColumn()
    id: number;
  /**
   * Email del usuario.
   */
  @ApiProperty({ description: 'Email del usuario', example: 'jon@hotmail.com' })
  @Column({ unique: true })
    email: string;
  /**
   * Contraseña del usuario.
   */
  @ApiProperty({ description: 'Constraseña del usuario', example: '12345' })
  @Column()
    password: string;
  /**
   * Rol del usuario.
   */
  @ApiProperty({ description: 'Rol del usuario', example: '1' })
  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'rol_id' })
    rol: Rol;
  /**
   * Nombre del usuario.
   */
  @ApiProperty({ description: 'Nombre del usuario', example: 'Carlos' })
  @Column({ length: 50 })
    nombre: string;
  /**
   * Apellido del usuario.
   */
  @ApiProperty({ description: 'Apellido del usuario', example: 'Soler' })
  @Column({ length: 50 })
    apellido: string;
  /**
   * Cédula del usuario.
   */
  @ApiProperty({ description: 'Cédula del usuario', example: '0932304282' })
  @Column({ length: 10 })
    cedula: string;
  /**
   * Dirección del usuario.
   */
  @ApiProperty({ description: 'Dirección del usuario', example: 'La Alborada' })
  @Column({ length: 70 })
    direccion: string;
  /**
   * Historial clínico del usuario.
   */
  @ApiProperty({ description: 'Historial clínico del usuario' })
  @OneToOne(() => HistorialClinico, { cascade: true })
  @JoinColumn()
    historialClinico: HistorialClinico;
  /**
   * Lista de citas del usuario.
   */
  @ApiProperty({ description: 'Lista de citas del usuario' })
  @OneToMany(() => Cita, cita => cita.user)
    citas: Cita[];
}
