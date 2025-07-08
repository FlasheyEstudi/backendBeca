// src/beca_carrera/beca_carrera.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entities/beca_carrera.entity'; // Importa la entidad Carrera
import { CreateCarreraDto } from './dto/beca_carrera.dto'; // Importa el DTO

@Injectable()
export class BecaCarreraService {
  constructor(
    @InjectRepository(Carrera) // Inyecta el repositorio de Carrera
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(createCarreraDto: CreateCarreraDto): Promise<Carrera> {
    // Opcional: Verificar si ya existe una carrera con el mismo nombre para evitar duplicados
    const existingCarrera = await this.carreraRepository.findOne({ where: { Nombre: createCarreraDto.Nombre } });
    if (existingCarrera) {
      throw new ConflictException(`La carrera con nombre '${createCarreraDto.Nombre}' ya existe.`);
    }

    const nuevaCarrera = this.carreraRepository.create(createCarreraDto);
    return await this.carreraRepository.save(nuevaCarrera);
  }

  async findAll(): Promise<Carrera[]> {
    // Puedes incluir relaciones si quieres cargar datos relacionados (ej. estudiantes o asignaturas de la carrera)
    return await this.carreraRepository.find({ relations: ['estudiantes', 'asignaturas'] });
  }

  async findOne(id: number): Promise<Carrera> {
    const carrera = await this.carreraRepository.findOne({ where: { Id: id }, relations: ['estudiantes', 'asignaturas'] });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }
    return carrera;
  }
}
