import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importa tus módulos existentes
import { BecaEstadoModule } from './beca_estado/beca_estado.module';
import { CarreraModule } from './beca_carrera/beca_carrera.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { NotaModule } from './nota/nota.module';
import { TipoBecaModule } from './tipobeca/tipobeca.module';
import { PeriodoAcademicoModule } from './periodoacademico/periodoacademico.module';
import { RequisitoModule } from './requisito/requisito.module';
import { BecaModule } from './beca/beca.module';
import { SolicitudBecaModule } from './beca_solicitudbeca/solicitudbeca.module';
import { AsignacionBecaModule } from './beca_asignacionbeca/asignacionbeca.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'flash',
      database: 'bdbeca',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Escanea todas las entidades
      synchronize: false, // Cambia a true solo para desarrollo; usa migraciones en producción
      logging: true, // Opcional: Habilitar logs para depuración
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
    BecaModule,
    SolicitudBecaModule,
    AsignacionBecaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}