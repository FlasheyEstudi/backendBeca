import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
  providers: [EstudianteService],
  controllers: [EstudianteController],
  exports: [TypeOrmModule], // Exporta el repositorio para que otros módulos lo usen
})
export class EstudianteModule {}
