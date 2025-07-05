import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { AsignaturaController } from './asignatura.controller';
import { AsignaturaService } from './asignatura.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asignatura])],
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
})
export class AsignaturaModule {}