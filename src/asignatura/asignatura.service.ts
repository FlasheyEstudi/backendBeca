import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
  ) {}

  async create(createAsignaturaDto: CreateAsignaturaDto) {
    const asignatura = this.asignaturaRepository.create(createAsignaturaDto);
    const result = await this.asignaturaRepository.save(asignatura);
    return { NewId: result.Id };
  }

  async findAll() {
    return await this.asignaturaRepository.find();
  }
}