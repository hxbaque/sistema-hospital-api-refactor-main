import { Module } from '@nestjs/common';
import { HistorialClinicoService } from './historial-clinico.service';
import { HistorialClinicoController } from './historial-clinico.controller';
import { HistorialClinico } from './entities/historial-clinico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialClinicoRepository } from './historial-clinico.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialClinico])],
  controllers: [HistorialClinicoController],
  providers: [HistorialClinicoService, HistorialClinicoRepository],
})
export class HistorialClinicoModule {}
