    // src/asignatura/asignatura.module.ts
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { Asignatura } from './entities/asignatura.entity';
    import { AsignaturaController } from './asignatura.controller';
    import { AsignaturaService } from './asignatura.service';
    import { Carrera } from '../carrera/entities/carrera.entity'; // Asegúrate de que la ruta sea correcta

    @Module({
      imports: [
        TypeOrmModule.forFeature([
          Asignatura,
          Carrera // <--- ¡Asegúrate de que Carrera esté aquí para que su repositorio pueda ser inyectado!
        ])
      ],
      controllers: [AsignaturaController],
      providers: [AsignaturaService],
    })
    export class AsignaturaModule {}
    