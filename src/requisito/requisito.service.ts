import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requisito } from './entities/requisito.entity';

@Injectable()
export class RequisitoService {
  constructor(
    @InjectRepository(Requisito)
    private readonly requisitoRepository: Repository<Requisito>,
  ) {}

  async findAll() {
    return await this.requisitoRepository.find();
  }
}