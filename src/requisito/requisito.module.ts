import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requisito } from './entities/requisito.entity';
import { RequisitoController } from './requisito.controller';
import { RequisitoService } from './requisito.service';

@Module({
  imports: [TypeOrmModule.forFeature([Requisito])],
  controllers: [RequisitoController],
  providers: [RequisitoService],
})
export class RequisitoModule {}