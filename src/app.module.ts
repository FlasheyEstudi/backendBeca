import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BecaEstadoModule } from './beca_estado/beca_estado.module';
import { CarreraModule } from './carrera/carrera.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { NotaModule } from './nota/nota.module'; // Ensure this line exists
import { TipoBecaModule } from './tipobeca/tipobeca.module';
import { PeriodoAcademicoModule } from './periodoacademico/periodoacademico.module';
import { RequisitoModule } from './requisito/requisito.module';
import { BecaModule } from './beca/beca.module';
// C:\becas-app\src\app.module.ts
// ... otras importaciones
import { SolicitudBecaModule } from './beca_solicitudbeca/solicitudbeca.module'; // Línea 15: ¡SIN ../src/!
import { AsignacionBecaModule } from './beca_asignacionbeca/asignacionbeca.module'; // Línea 16: ¡SIN ../src/!
// ...

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
    NotaModule, // Ensure this is included
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