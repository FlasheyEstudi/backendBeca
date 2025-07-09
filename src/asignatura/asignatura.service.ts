// src/asignatura/asignatura.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto'; // Importa el DTO de actualización
import { Carrera } from '../beca_carrera/entities/beca_carrera.entity'; // Importa la entidad Carrera

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
    @InjectRepository(Carrera) // Inyecta el repositorio de Carrera para validación
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(createAsignaturaDto: CreateAsignaturaDto): Promise<Asignatura> {
    // 1. Verificar si la Carrera existe antes de crear la asignatura
    const carrera = await this.carreraRepository.findOne({ where: { Id: createAsignaturaDto.CarreraId } });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${createAsignaturaDto.CarreraId} no encontrada`);
    }

    // 2. Opcional: Verificar si ya existe una asignatura con el mismo nombre en la misma carrera
    const existingAsignatura = await this.asignaturaRepository.findOne({
      where: { Nombre: createAsignaturaDto.Nombre, CarreraId: createAsignaturaDto.CarreraId }
    });
    if (existingAsignatura) {
      throw new ConflictException(`La asignatura con nombre '${createAsignaturaDto.Nombre}' ya existe para la carrera con ID ${createAsignaturaDto.CarreraId}.`);
    }

    // 3. Crear la instancia de Asignatura
    const asignatura = this.asignaturaRepository.create(createAsignaturaDto);
    return await this.asignaturaRepository.save(asignatura);
  }

  async findAll(): Promise<Asignatura[]> {
    return await this.asignaturaRepository.find({ relations: ['carrera'] }); // Incluye la relación con Carrera
  }

  async findOne(id: number): Promise<Asignatura> {
    const asignatura = await this.asignaturaRepository.findOne({ where: { Id: id }, relations: ['carrera'] });
    if (!asignatura) {
      throw new NotFoundException(`Asignatura con ID ${id} no encontrada`);
    }
    return asignatura;
  }

  // --- NUEVO: Método para actualizar una Asignatura ---
  async update(id: number, updateAsignaturaDto: UpdateAsignaturaDto): Promise<Asignatura> {
    const asignatura = await this.asignaturaRepository.findOne({ where: { Id: id } });
    if (!asignatura) {
      throw new NotFoundException(`Asignatura con ID ${id} no encontrada`);
    }

    // Si se intenta actualizar CarreraId, verificar que el nuevo ID exista
    if (updateAsignaturaDto.CarreraId && updateAsignaturaDto.CarreraId !== asignatura.CarreraId) {
      const carrera = await this.carreraRepository.findOne({ where: { Id: updateAsignaturaDto.CarreraId } });
      if (!carrera) {
        throw new NotFoundException(`Carrera con ID ${updateAsignaturaDto.CarreraId} no encontrada.`);
      }
    }

    // Si se intenta cambiar el nombre, verificar que el nuevo nombre no exista ya para la misma carrera
    if (updateAsignaturaDto.Nombre && updateAsignaturaDto.Nombre !== asignatura.Nombre) {
      const existingAsignatura = await this.asignaturaRepository.findOne({
        where: { Nombre: updateAsignaturaDto.Nombre, CarreraId: updateAsignaturaDto.CarreraId || asignatura.CarreraId }
      });
      if (existingAsignatura && existingAsignatura.Id !== id) {
        throw new ConflictException(`La asignatura con nombre '${updateAsignaturaDto.Nombre}' ya existe para la carrera con ID ${updateAsignaturaDto.CarreraId || asignatura.CarreraId}.`);
      }
    }

    // Aplica los cambios del DTO al objeto de la asignatura existente
    this.asignaturaRepository.merge(asignatura, updateAsignaturaDto);
    return await this.asignaturaRepository.save(asignatura);
  }

  // --- NUEVO: Método para eliminar una Asignatura ---
  async remove(id: number): Promise<void> {
    const result = await this.asignaturaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Asignatura con ID ${id} no encontrada`);
    }
  }
}
