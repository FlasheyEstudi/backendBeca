// src/asignatura/asignatura.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { Carrera } from '../carrera/entities/carrera.entity'; // Importa la entidad Carrera

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
    @InjectRepository(Carrera) // Inyecta el repositorio de Carrera
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(createAsignaturaDto: CreateAsignaturaDto) {
    // Opcional: Verificar si la Carrera existe antes de crear la asignatura
    const carrera = await this.carreraRepository.findOne({ where: { Id: createAsignaturaDto.CarreraId } });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${createAsignaturaDto.CarreraId} no encontrada`);
    }

    const asignatura = this.asignaturaRepository.create({
      ...createAsignaturaDto, // Esto copiará Nombre y Creditos
      CarreraId: createAsignaturaDto.CarreraId, // Asegúrate de asignar CarreraId
      // Si tienes una relación, también puedes asignar la entidad completa:
      // carrera: carrera,
    });
    return this.asignaturaRepository.save(asignatura);
  }

  // --- MÉTODO findAll() AÑADIDO ---
  async findAll(): Promise<Asignatura[]> {
    // Puedes incluir relaciones si quieres cargar datos relacionados (ej. la carrera de la asignatura)
    return await this.asignaturaRepository.find({ relations: ['carrera'] });
  }
  // --- FIN MÉTODO findAll() ---
}
