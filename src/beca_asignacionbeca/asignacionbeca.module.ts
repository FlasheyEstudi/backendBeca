import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionBecaController } from './asignacionbeca.controller';
import { AsignacionBeca } from './entities/asignacionbeca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AsignacionBeca])],
  controllers: [AsignacionBecaController],
})
export class AsignacionBecaModule {}