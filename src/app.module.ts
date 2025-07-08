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
import { TipoBecaModule } from './tipobeca/tipobeca.module'; // Asegura esta importación
import { PeriodoAcademicoModule } from './periodoacademico/periodoacademico.module';
import { RequisitoModule } from './requisito/requisito.module'; // Asegura esta importación
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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    BecaEstadoModule,
    CarreraModule,
    EstudianteModule,
    AsignaturaModule,
    AsistenciaModule,
    NotaModule,
    TipoBecaModule, // Asegúrate de que esté aquí
    PeriodoAcademicoModule,
    RequisitoModule, // Asegúrate de que esté aquí
    BecaModule,
    SolicitudBecaModule,
    AsignacionBecaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} // Asegúrate de que 'export' esté presente
