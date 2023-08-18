import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { HistorialClinicoRepository } from 'src/historial-clinico/historial-clinico.repository';
import { HistorialClinicoService } from 'src/historial-clinico/historial-clinico.service';
import { HistorialClinico } from 'src/historial-clinico/entities/historial-clinico.entity';
import { Cita } from 'src/cita/entities/cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialClinico, User, Cita])],
  controllers: [UserController],
  providers: [UserService, UserRepository, HistorialClinicoService, HistorialClinicoRepository],
})
export class UserModule {}
