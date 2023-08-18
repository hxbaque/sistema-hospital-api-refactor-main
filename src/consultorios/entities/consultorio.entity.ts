import { Cita } from '../../cita/entities/cita.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Consultorio {
  /**
   * ID del consultorio.
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID del consultorio' })
    id: number;

  /**
   * Especialidad del consultorio.
   *
   * @type {string}
   */
  @Column({ length: 45 })
  @ApiProperty({
    example: 'Especialidad del consultorio',
    description: 'Especialidad del consultorio',
  })
    especialidad: string;

  /**
   * Médico asignado al consultorio.
   *
   * @type {User}
   */
  @OneToOne(() => User, { cascade: false })
  @JoinColumn({ name: 'id_medico' })
  @ApiProperty({
    type: () => User,
    description: 'Médico asignado al consultorio',
  })
    medico: User;

  /**
   * Lista de citas relacionadas al consultorio.
   *
   * @type {Cita[]}
   */
  @ManyToMany(() => Cita, (cita) => cita.consultorios)
  @ApiProperty({
    type: () => Cita,
    isArray: true,
    description: 'Lista de citas relacionadas al consultorio',
  })
    citas: Cita[];
}
