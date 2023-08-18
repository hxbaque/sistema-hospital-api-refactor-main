import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HistorialClinico {


    @PrimaryGeneratedColumn()
      id: number;
    /**
     * Edad del paciente.
     */
    @ApiProperty({ example: 25, description: 'Edad del paciente', nullable: true })
    @Column({ nullable: true })
      edad: number;
    /**
     * Altura del paciente.
     */
    @ApiProperty({ example: 170, description: 'Altura del paciente', nullable: true })
    @Column({ nullable: true })
      altura: number;
    /**
     * Peso del paciente.
     */
    @ApiProperty({ example: 70, description: 'Peso del paciente', nullable: true })
    @Column({ nullable: true })
      peso: number;
    /**
     * Masa corporal del paciente.
     */
    @ApiProperty({ example: 23, description: 'Masa corporal del paciente', nullable: true })
    @Column({ nullable: true })
      masaCorporal: number;

    /**
     * Temperatura del paciente.
     */
    @ApiProperty({ example: 37, description: 'Temperatura del paciente', nullable: true })
    @Column({ nullable: true })
      temperatura: number;

    /**
     * Frecuencia respiratoria del paciente.
     */
    @ApiProperty({ example: 18, description: 'Frecuencia respiratoria del paciente', nullable: true })
    @Column({ nullable: true })
      frecuenciaRespiratoria: number;
    /**
     * Presión arterial del paciente.
     */
    @ApiProperty({ example: 20, description: 'Presión arterial del paciente', nullable: true })
    @Column({ nullable: true })
      presionArterial: number;

    /**
     * Frecuencia cardíaca del paciente.
     */
    @ApiProperty({ example: 70, description: 'Frecuencia cardíaca del paciente', nullable: true })
    @Column({ nullable: true })
      frecuenciaCardiaca: number;

    /**
     * Indicador de diabetes del paciente.
     */
    @ApiProperty({ example: true, description: 'Indicador de diabetes del paciente', nullable: true })
    @Column({ nullable: true })
      diabetes: boolean;

    /**
     * Descripción de diabetes del paciente.
     */
    @ApiProperty({ example: 'Descripción de diabetes', description: 'Descripción de diabetes del paciente', nullable: true })
    @Column({ nullable: true, type: 'text' })
      diabetesDescripcion: string;

    /**
     * Indicador de afección tiroidea del paciente.
     */
    @ApiProperty({ example: true, description: 'Indicador de afección tiroidea del paciente', nullable: true })
    @Column({ nullable: true })
      tiroideas: boolean;

    /**
     * Descripción de afección tiroidea del paciente.
     */
    @ApiProperty({ example: 'Descripción de afección tiroidea', description: 'Descripción de afección tiroidea del paciente', nullable: true })
    @Column({ nullable: true, type: 'text' })
      tiroideasDescripcion: string;

    /**
     * Indicador de hipertensión del paciente.
     */
    @ApiProperty({ example: true, description: 'Indicador de hipertensión del paciente', nullable: true })
    @Column({ nullable: true })
      hipertension: boolean;

    /**
     * Descripción de hipertensión del paciente.
     */
    @ApiProperty({ example: 'Descripción de hipertensión', description: 'Descripción de hipertensión del paciente', nullable: true })
    @Column({ nullable: true, type: 'text' })
      hipertensionDescripcion: string;

    /**
     * Indicador de cardiopatía del paciente.
     */
    @ApiProperty({ example: true, description: 'Indicador de cardiopatía del paciente', nullable: true })
    @Column({ nullable: true })
      cardiopatia: boolean;

    /**
     * Descripción de cardiopatía del paciente.
     */
    @ApiProperty({ example: 'Descripción de cardiopatía', description: 'Descripción de cardiopatía del paciente', nullable: true })
    @Column({ nullable: true, type: 'text' })
      cardiopatiaDescripcion: string;

    /**
     * Indicador de traumatismo del paciente.
     */
    @ApiProperty({ example: true, description: 'Indicador de traumatismo del paciente', nullable: true })
    @Column({ nullable: true })
      traumatismo: boolean;

    /**
     * Descripción de traumatismo del paciente.
     */
    @ApiProperty({ example: 'Descripción de traumatismo', description: 'Descripción de traumatismo del paciente', nullable: true })
    @Column({ nullable: true, type: 'text' })
      traumatismoDescripcion: string;

    /**
     * Indicador de cáncer del paciente.
     */
    @ApiProperty({ example: true, description: 'Indicador de cáncer del paciente', nullable: true })
    @Column({ nullable: true })
      cancer: boolean;

    /**
     * Descripción de cáncer del paciente.
     */
    @ApiProperty({ example: 'Descripción de cáncer', description: 'Descripción de cáncer del paciente', nullable: true })
    @Column({ nullable: true, type: 'text' })
      cancerDescripcion: string;

    /**
     * Indicador de otros problemas del paciente.
     */
    @ApiProperty({ example: true, description: 'Indicador de otros problemas del paciente', nullable: true })
    @Column({ nullable: true })
      otros: boolean;

    /**
     * Descripción de otros problemas del paciente.
     */
    @ApiProperty({ example: 'Descripción de otros problemas', description: 'Descripción de otros problemas del paciente', nullable: true })
    @Column({ nullable: true, type: 'text' })
      otrosDescripcion: string;
}
