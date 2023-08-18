import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { HistorialClinico } from 'src/historial-clinico/entities/historial-clinico.entity';
import { HistorialClinicoRepository } from 'src/historial-clinico/historial-clinico.repository';
import { HistorialClinicoService } from 'src/historial-clinico/historial-clinico.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forFeature([User, HistorialClinico]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    HistorialClinicoService,
    HistorialClinicoRepository,
  ],
})
export class AuthModule {}
