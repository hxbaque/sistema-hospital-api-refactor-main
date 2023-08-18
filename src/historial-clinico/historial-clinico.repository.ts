import {  EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { HistorialClinico } from './entities/historial-clinico.entity';

@Injectable()
@EntityRepository(HistorialClinico)
export class HistorialClinicoRepository extends Repository<HistorialClinico> {
  // Métodos personalizados del repositorio, si los tienes
}
