import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { HistorialClinicoRepository } from 'src/historial-clinico/historial-clinico.repository';
import { HistorialClinico } from 'src/historial-clinico/entities/historial-clinico.entity';
import { HistorialClinicoService } from 'src/historial-clinico/historial-clinico.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, HistorialClinico])],
  controllers: [MedicosController],
  providers: [
    MedicosService,
    HistorialClinicoService,
    HistorialClinicoRepository,
    UserService,
    UserRepository,
  ],
})
export class MedicosModule {}
