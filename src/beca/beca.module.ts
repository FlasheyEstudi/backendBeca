import { Module } from '@nestjs/common';
import { BecaService } from './beca.service';
import { BecaController } from './beca.controller';

@Module({
  providers: [BecaService],
  controllers: [BecaController],
})
export class BecaModule {}