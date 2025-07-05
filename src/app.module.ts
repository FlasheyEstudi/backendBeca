import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BecaEstadoModule } from './beca_estado/beca_estado.module';
import { CarreraModule } from './carrera/carrera.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { NotaModule } from './nota/nota.module';
import { TipoBecaModule } from './tipobeca/tipobeca.module';
import { PeriodoAcademicoModule } from './periodoacademico/periodoacademico.module';
import { RequisitoModule } from './requisito/requisito.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'flash',
      database: 'bdbeca',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Usa true solo para desarrollo inicial
    }),
    BecaEstadoModule,
    CarreraModule,
    EstudianteModule,
    AsignaturaModule,
    AsistenciaModule,
    NotaModule,
    TipoBecaModule,
    PeriodoAcademicoModule,
    RequisitoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}