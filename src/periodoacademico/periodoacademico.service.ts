// src/periodoacademico/periodoacademico.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeriodoAcademico } from './entities/periodoacademico.entity';
import { CreatePeriodoAcademicoDto } from './dto/create-periodoacademico.dto';
import { UpdatePeriodoAcademicoDto } from './dto/update-periodoacademico.dto'; // Importa el DTO de actualización

@Injectable()
export class PeriodoAcademicoService {
  constructor(
    @InjectRepository(PeriodoAcademico)
    private readonly periodoAcademicoRepository: Repository<PeriodoAcademico>,
  ) {}

  async create(createPeriodoAcademicoDto: CreatePeriodoAcademicoDto): Promise<PeriodoAcademico> {
    // Verificar si ya existe un período académico con el mismo nombre para evitar duplicados
    const existingPeriodo = await this.periodoAcademicoRepository.findOne({ where: { Nombre: createPeriodoAcademicoDto.Nombre } });
    if (existingPeriodo) {
      throw new ConflictException(`El período académico con nombre '${createPeriodoAcademicoDto.Nombre}' ya existe.`);
    }

    // Crear la instancia del período académico
    const nuevoPeriodo = this.periodoAcademicoRepository.create({
      Nombre: createPeriodoAcademicoDto.Nombre,
      FechaInicio: new Date(createPeriodoAcademicoDto.FechaInicio), // Convertir a Date
      FechaFin: new Date(createPeriodoAcademicoDto.FechaFin),       // Convertir a Date
    });
    return await this.periodoAcademicoRepository.save(nuevoPeriodo);
  }

  async findAll(): Promise<PeriodoAcademico[]> {
    return await this.periodoAcademicoRepository.find();
  }

  // --- NUEVO: Método para obtener un PeriodoAcademico por ID ---
  async findOne(id: number): Promise<PeriodoAcademico> {
    const periodo = await this.periodoAcademicoRepository.findOne({ where: { Id: id } });
    if (!periodo) {
      throw new NotFoundException(`Período Académico con ID ${id} no encontrado.`);
    }
    return periodo;
  }

  // --- NUEVO: Método para actualizar un PeriodoAcademico ---
  async update(id: number, updatePeriodoAcademicoDto: UpdatePeriodoAcademicoDto): Promise<PeriodoAcademico> {
    const periodo = await this.periodoAcademicoRepository.findOne({ where: { Id: id } });
    if (!periodo) {
      throw new NotFoundException(`Período Académico con ID ${id} no encontrado.`);
    }

    // Si se intenta cambiar el nombre, verificar que el nuevo nombre no exista ya
    if (updatePeriodoAcademicoDto.Nombre && updatePeriodoAcademicoDto.Nombre !== periodo.Nombre) {
      const existingPeriodo = await this.periodoAcademicoRepository.findOne({ where: { Nombre: updatePeriodoAcademicoDto.Nombre } });
      if (existingPeriodo && existingPeriodo.Id !== id) {
        throw new ConflictException(`El período académico con nombre '${updatePeriodoAcademicoDto.Nombre}' ya existe.`);
      }
    }

    // Manejar FechaInicio si se actualiza
    if (updatePeriodoAcademicoDto.FechaInicio) {
      periodo.FechaInicio = new Date(updatePeriodoAcademicoDto.FechaInicio);
      delete updatePeriodoAcademicoDto.FechaInicio; // Eliminar del DTO para que merge no intente asignar string a Date
    }

    // Manejar FechaFin si se actualiza
    if (updatePeriodoAcademicoDto.FechaFin) {
      periodo.FechaFin = new Date(updatePeriodoAcademicoDto.FechaFin);
      delete updatePeriodoAcademicoDto.FechaFin; // Eliminar del DTO para que merge no intente asignar string a Date
    }

    // Aplica los cambios restantes del DTO al objeto del período existente
    this.periodoAcademicoRepository.merge(periodo, updatePeriodoAcademicoDto);
    return await this.periodoAcademicoRepository.save(periodo);
  }

  // --- NUEVO: Método para eliminar un PeriodoAcademico ---
  async remove(id: number): Promise<void> {
    const result = await this.periodoAcademicoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Período Académico con ID ${id} no encontrado.`);
    }
  }
}
