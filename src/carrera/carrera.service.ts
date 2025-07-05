import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entities/carrera.entity';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async findAll() {
    return await this.carreraRepository.find();
  }

  async findOne(id: number) {
    const carrera = await this.carreraRepository.findOne({ where: { Id: id } });
    if (!carrera) throw new Error('Carrera no encontrada');
    return carrera;
  }
}