import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EstudianteModule } from './estudiante/estudiante.module';
import { BecaEstadoModule } from './beca_estado/beca_estado.module';
import { CarreraModule } from './beca_carrera/beca_carrera.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { AsignaturaModule } from './asignatura/asignatura.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'flash',
      database: 'bdbeca',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    EstudianteModule,
    BecaEstadoModule,
    CarreraModule,
    AsistenciaModule,
    AsignaturaModule,
  ],
})
export class AppModule {}