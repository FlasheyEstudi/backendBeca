import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoBeca } from './entities/tipobeca.entity';
import { TipobecaController } from './tipobeca.controller';
import { TipobecaService } from './tipobeca.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoBeca])],
  controllers: [TipobecaController],
  providers: [TipobecaService],
})
export class TipoBecaModule {}