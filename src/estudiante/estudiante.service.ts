import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Beca_Estado } from '../beca_estado/entities/beca_estado.entity';
import { Carrera } from '../carrera/entities/carrera.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Beca_Estado)
    private readonly estadoRepository: Repository<Beca_Estado>,
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    const estado = await this.estadoRepository.findOne({ where: { Id: createEstudianteDto.EstadoId } });
    if (!estado) throw new NotFoundException('Estado no encontrado');

    const carrera = await this.carreraRepository.findOne({ where: { Id: createEstudianteDto.CarreraId } });
    if (!carrera) throw new NotFoundException('Carrera no encontrada');

    const estudiante = this.estudianteRepository.create({
      ...createEstudianteDto,
      estado,
      carrera,
    });
    const result = await this.estudianteRepository.save(estudiante);
    return { NewId: result.Id };
  }

  async findAll() {
    return await this.estudianteRepository.find({ relations: ['estado', 'carrera'] });
  }
}