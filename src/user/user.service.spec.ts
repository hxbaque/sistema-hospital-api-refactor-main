import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { HistorialClinicoService } from 'src/historial-clinico/historial-clinico.service';
import { HistorialClinicoRepository } from 'src/historial-clinico/historial-clinico.repository';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,UserRepository,HistorialClinicoService,HistorialClinicoRepository],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
