// src/nota/nota.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto'; // Importa el DTO de actualización
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';
import { PeriodoAcademico } from '../periodoacademico/entities/periodoacademico.entity';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
    @InjectRepository(PeriodoAcademico)
    private readonly periodoAcademicoRepository: Repository<PeriodoAcademico>,
  ) {}

  async create(createNotaDto: CreateNotaDto) {
    // 1. Verificar que el Estudiante exista
    const estudiante = await this.estudianteRepository.findOne({ where: { Id: createNotaDto.EstudianteId } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${createNotaDto.EstudianteId} no encontrado`);
    }

    // 2. Verificar que la Asignatura exista
    const asignatura = await this.asignaturaRepository.findOne({ where: { Id: createNotaDto.AsignaturaId } });
    if (!asignatura) {
      throw new NotFoundException(`Asignatura con ID ${createNotaDto.AsignaturaId} no encontrada`);
    }

    // 3. Verificar que el Periodo Académico exista
    const periodoAcademico = await this.periodoAcademicoRepository.findOne({ where: { Id: createNotaDto.PeriodoAcademicoId } });
    if (!periodoAcademico) {
      throw new NotFoundException(`Periodo Académico con ID ${createNotaDto.PeriodoAcademicoId} no encontrado`);
    }

    // 4. Opcional: Verificar si ya existe una nota para el mismo estudiante, asignatura y período
    const existingNota = await this.notaRepository.findOne({
      where: {
        EstudianteId: createNotaDto.EstudianteId,
        AsignaturaId: createNotaDto.AsignaturaId,
        PeriodoAcademicoId: createNotaDto.PeriodoAcademicoId,
      }
    });

    if (existingNota) {
      throw new ConflictException(`Ya existe una nota para el estudiante ${createNotaDto.EstudianteId} en la asignatura ${createNotaDto.AsignaturaId} para el período ${createNotaDto.PeriodoAcademicoId}.`);
    }

    // 5. Crear la instancia de Nota
    const nota = this.notaRepository.create({
      Calificacion: createNotaDto.Calificacion,
      EstudianteId: createNotaDto.EstudianteId,
      AsignaturaId: createNotaDto.AsignaturaId,
      PeriodoAcademicoId: createNotaDto.PeriodoAcademicoId,
      // FechaRegistro se manejará automáticamente por el default de la base de datos si está configurado en la entidad
    });

    const result = await this.notaRepository.save(nota);
    return { NewId: result.Id };
  }

  async findAll() {
    // Incluir las relaciones para que se carguen los datos de estudiante, asignatura y periodoAcademico
    return await this.notaRepository.find({ relations: ['estudiante', 'asignatura', 'periodoAcademico'] });
  }

  // --- NUEVO: Método para obtener una Nota por ID ---
  async findOne(id: number): Promise<Nota> {
    const nota = await this.notaRepository.findOne({
      where: { Id: id },
      relations: ['estudiante', 'asignatura', 'periodoAcademico'],
    });
    if (!nota) {
      throw new NotFoundException(`Nota con ID ${id} no encontrada.`);
    }
    return nota;
  }

  // --- NUEVO: Método para actualizar una Nota ---
  async update(id: number, updateNotaDto: UpdateNotaDto): Promise<Nota> {
    const nota = await this.notaRepository.findOne({ where: { Id: id } });
    if (!nota) {
      throw new NotFoundException(`Nota con ID ${id} no encontrada.`);
    }

    // Si se intenta actualizar EstudianteId, verificar que el nuevo ID exista
    if (updateNotaDto.EstudianteId && updateNotaDto.EstudianteId !== nota.EstudianteId) {
      const estudiante = await this.estudianteRepository.findOne({ where: { Id: updateNotaDto.EstudianteId } });
      if (!estudiante) {
        throw new NotFoundException(`Estudiante con ID ${updateNotaDto.EstudianteId} no encontrado.`);
      }
    }

    // Si se intenta actualizar AsignaturaId, verificar que el nuevo ID exista
    if (updateNotaDto.AsignaturaId && updateNotaDto.AsignaturaId !== nota.AsignaturaId) {
      const asignatura = await this.asignaturaRepository.findOne({ where: { Id: updateNotaDto.AsignaturaId } });
      if (!asignatura) {
        throw new NotFoundException(`Asignatura con ID ${updateNotaDto.AsignaturaId} no encontrada.`);
      }
    }

    // Si se intenta actualizar PeriodoAcademicoId, verificar que el nuevo ID exista
    if (updateNotaDto.PeriodoAcademicoId && updateNotaDto.PeriodoAcademicoId !== nota.PeriodoAcademicoId) {
      const periodoAcademico = await this.periodoAcademicoRepository.findOne({ where: { Id: updateNotaDto.PeriodoAcademicoId } });
      if (!periodoAcademico) {
        throw new NotFoundException(`Periodo Académico con ID ${updateNotaDto.PeriodoAcademicoId} no encontrado.`);
      }
    }

    // Aplica los cambios del DTO al objeto de la nota existente
    this.notaRepository.merge(nota, updateNotaDto);
    return await this.notaRepository.save(nota);
  }

  // --- NUEVO: Método para eliminar una Nota ---
  async remove(id: number): Promise<void> {
    const result = await this.notaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Nota con ID ${id} no encontrada.`);
    }
  }
}
