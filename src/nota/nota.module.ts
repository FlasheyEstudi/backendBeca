import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { NotaController } from './nota.controller';
import { NotaService } from './nota.service';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nota, Estudiante, Asignatura])],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}