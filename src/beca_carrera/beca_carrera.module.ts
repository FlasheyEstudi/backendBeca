import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beca_Carrera } from './entities/beca_carrera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beca_Carrera])],
  exports: [TypeOrmModule], // Exporta el TypeOrmModule para que otros módulos lo usen
})
export class CarreraModule {}