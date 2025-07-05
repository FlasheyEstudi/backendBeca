import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaController } from './asignatura.controller';
import { Asignatura } from './entities/asignatura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asignatura])],
  providers: [AsignaturaService],
  controllers: [AsignaturaController],
  exports: [TypeOrmModule], // Exporta el repositorio
})
export class AsignaturaModule {}