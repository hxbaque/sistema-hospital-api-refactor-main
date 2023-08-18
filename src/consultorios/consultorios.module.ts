import { Module } from '@nestjs/common';
import { ConsultoriosService } from './consultorios.service';
import { ConsultoriosController } from './consultorios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultorio } from './entities/consultorio.entity';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { HistorialClinicoRepository } from 'src/historial-clinico/historial-clinico.repository';
import { HistorialClinico } from 'src/historial-clinico/entities/historial-clinico.entity';
import { HistorialClinicoService } from 'src/historial-clinico/historial-clinico.service';
import { Cita } from 'src/cita/entities/cita.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Consultorio, User, HistorialClinico, Cita]),
  ],
  controllers: [ConsultoriosController],
  providers: [
    ConsultoriosService,
    HistorialClinicoRepository,
    HistorialClinicoService,
    UserService,
    UserRepository,
  ],
})
export class ConsultoriosModule {}
