import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoBeca } from './entities/tipobeca.entity';

@Injectable()
export class TipobecaService {
  constructor(
    @InjectRepository(TipoBeca)
    private readonly tipobecaRepository: Repository<TipoBeca>,
  ) {}

  async findAll() {
    return await this.tipobecaRepository.find();
  }

  async findOne(id: number) {
    const tipoBeca = await this.tipobecaRepository.findOne({ where: { Id: id } });
    if (!tipoBeca) throw new Error('Tipo de beca no encontrado');
    return tipoBeca;
  }
}