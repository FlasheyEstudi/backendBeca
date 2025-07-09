// src/estudiante/estudiante.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Beca_Estado } from '../beca_estado/entities/beca_estado.entity';
import { Carrera } from '../beca_carrera/entities/beca_carrera.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Beca_Estado)
    private readonly becaEstadoRepository: Repository<Beca_Estado>,
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    // Verificar si el EstadoId existe
    const estado = await this.becaEstadoRepository.findOne({ where: { Id: createEstudianteDto.EstadoId } });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${createEstudianteDto.EstadoId} no encontrado.`);
    }

    // Verificar si el CarreraId existe
    const carrera = await this.carreraRepository.findOne({ where: { Id: createEstudianteDto.CarreraId } });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${createEstudianteDto.CarreraId} no encontrada.`);
    }

    // Verificar si el CorreoElectronico ya existe
    const existingEstudiante = await this.estudianteRepository.findOne({ where: { CorreoElectronico: createEstudianteDto.CorreoElectronico } });
    if (existingEstudiante) {
      throw new ConflictException(`El estudiante con correo '${createEstudianteDto.CorreoElectronico}' ya existe.`);
    }

    const estudiante = this.estudianteRepository.create({
      ...createEstudianteDto,
      FechaNacimiento: createEstudianteDto.FechaNacimiento ? new Date(createEstudianteDto.FechaNacimiento) : null, // Convertir a Date o null
    });

    return await this.estudianteRepository.save(estudiante);
  }

  async findAll(): Promise<Estudiante[]> {
    return await this.estudianteRepository.find({ relations: ['estado', 'carrera'] });
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { Id: id },
      relations: ['estado', 'carrera'],
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
    }
    return estudiante;
  }
}
