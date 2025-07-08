import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    console.log('Datos a crear:', createEstudianteDto);
    try {
      const estudiante = this.estudianteRepository.create(createEstudianteDto);
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      console.error('Error al guardar estudiante:', error);
      throw new HttpException('Error al guardar en la base de datos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find({
      relations: ['estado', 'carrera'],
    });
  }
}