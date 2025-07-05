import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beca_Estado } from './entities/beca_estado.entity';

@Injectable()
export class BecaEstadoService {
  constructor(
    @InjectRepository(Beca_Estado)
    private readonly becaEstadoRepository: Repository<Beca_Estado>,
  ) {}

  async findAll() {
    return await this.becaEstadoRepository.find();
  }

  async findOne(id: number) {
    const estado = await this.becaEstadoRepository.findOne({ where: { Id: id } });
    if (!estado) throw new Error('Estado no encontrado');
    return estado;
  }
}