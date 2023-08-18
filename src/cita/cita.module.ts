import { Module } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { User } from 'src/user/entities/user.entity';
import { Consultorio } from 'src/consultorios/entities/consultorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita, User, Consultorio])],
  controllers: [CitaController],
  providers: [CitaService],
})
export class CitaModule {}
