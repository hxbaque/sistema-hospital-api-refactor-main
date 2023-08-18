import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolModule } from './rol/rol.module';
import { ConsultoriosModule } from './consultorios/consultorios.module';
import { MedicosModule } from './medicos/medicos.module';
import { HistorialClinicoModule } from './historial-clinico/historial-clinico.module';
import { HistorialClinico } from './historial-clinico/entities/historial-clinico.entity';
import { CitaModule } from './cita/cita.module';
import { User } from './user/entities/user.entity';
import { Rol } from './rol/rol.entity';
import { Consultorio } from './consultorios/entities/consultorio.entity';
import { Cita } from './cita/entities/cita.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Rol, Consultorio, HistorialClinico, Cita],
      synchronize: true,
      // ssl: true,
      // ssl: process.env.NODE_ENV !== 'development',
    }),
    UserModule,
    AuthModule,
    RolModule,
    ConsultoriosModule,
    MedicosModule,
    HistorialClinicoModule,
    CitaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
