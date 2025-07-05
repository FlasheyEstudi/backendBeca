import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Nota])],
  providers: [NotaService],
  controllers: [NotaController],
})
export class NotaModule {}