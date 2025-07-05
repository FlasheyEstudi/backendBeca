import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beca_Carrera } from './entities/carrera.entity';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Beca_Carrera])],
  providers: [CarreraService],
  controllers: [CarreraController],
})
export class CarreraModule {}