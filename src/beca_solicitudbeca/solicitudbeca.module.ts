import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudBecaController } from './solicitudbeca.controller';
import { SolicitudBeca } from './entities/solicitudbeca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudBeca])],
  controllers: [SolicitudBecaController],
})
export class SolicitudBecaModule {}


