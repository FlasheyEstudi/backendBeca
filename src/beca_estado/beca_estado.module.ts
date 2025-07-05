import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beca_Estado } from './entities/beca_estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beca_Estado])],
  exports: [TypeOrmModule], // Exporta el TypeOrmModule para que otros módulos lo usen
})
export class BecaEstadoModule {}