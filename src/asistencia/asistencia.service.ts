// src/asistencia/asistencia.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto'; // Importa el DTO de actualización
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';
import { PeriodoAcademico } from '../periodoacademico/entities/periodoacademico.entity';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
    @InjectRepository(PeriodoAcademico)
    private readonly periodoAcademicoRepository: Repository<PeriodoAcademico>,
  ) {}

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    // 1. Verificar que el Estudiante exista
    const estudiante = await this.estudianteRepository.findOne({ where: { Id: createAsistenciaDto.EstudianteId } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${createAsistenciaDto.EstudianteId} no encontrado`);
    }

    // 2. Verificar que la Asignatura exista
    const asignatura = await this.asignaturaRepository.findOne({ where: { Id: createAsistenciaDto.AsignaturaId } });
    if (!asignatura) {
      throw new NotFoundException(`Asignatura con ID ${createAsistenciaDto.AsignaturaId} no encontrada`);
    }

    // 3. Verificar que el Periodo Académico exista
    const periodoAcademico = await this.periodoAcademicoRepository.findOne({ where: { Id: createAsistenciaDto.PeriodoAcademicoId } });
    if (!periodoAcademico) {
      throw new NotFoundException(`Periodo Académico con ID ${createAsistenciaDto.PeriodoAcademicoId} no encontrado`);
    }

    // Crear la instancia de Asistencia, asignando los IDs de las claves foráneas directamente
    const asistencia = this.asistenciaRepository.create({
      EstudianteId: createAsistenciaDto.EstudianteId,
      AsignaturaId: createAsistenciaDto.AsignaturaId,
      PeriodoAcademicoId: createAsistenciaDto.PeriodoAcademicoId,
      Fecha: new Date(createAsistenciaDto.Fecha), // Convertir la fecha de string a Date
      Asistio: createAsistenciaDto.Asistio,
      // Fecha_Registro se manejará automáticamente por el default de la base de datos
    });

    const result = await this.asistenciaRepository.save(asistencia);
    return { NewId: result.Id };
  }

  async findAll() {
    // Incluir las relaciones para que se carguen los datos de estudiante, asignatura y periodoAcademico
    return await this.asistenciaRepository.find({ relations: ['estudiante', 'asignatura', 'periodoAcademico'] });
  }

  // --- NUEVO: Método para obtener una Asistencia por ID ---
  async findOne(id: number): Promise<Asistencia> {
    const asistencia = await this.asistenciaRepository.findOne({
      where: { Id: id },
      relations: ['estudiante', 'asignatura', 'periodoAcademico'],
    });
    if (!asistencia) {
      throw new NotFoundException(`Asistencia con ID ${id} no encontrada.`);
    }
    return asistencia;
  }

  // --- NUEVO: Método para actualizar una Asistencia ---
  async update(id: number, updateAsistenciaDto: UpdateAsistenciaDto): Promise<Asistencia> {
    const asistencia = await this.asistenciaRepository.findOne({ where: { Id: id } });
    if (!asistencia) {
      throw new NotFoundException(`Asistencia con ID ${id} no encontrada.`);
    }

    // Si se intenta actualizar EstudianteId, verificar que el nuevo ID exista
    if (updateAsistenciaDto.EstudianteId && updateAsistenciaDto.EstudianteId !== asistencia.EstudianteId) {
      const estudiante = await this.estudianteRepository.findOne({ where: { Id: updateAsistenciaDto.EstudianteId } });
      if (!estudiante) {
        throw new NotFoundException(`Estudiante con ID ${updateAsistenciaDto.EstudianteId} no encontrado.`);
      }
    }

    // Si se intenta actualizar AsignaturaId, verificar que el nuevo ID exista
    if (updateAsistenciaDto.AsignaturaId && updateAsistenciaDto.AsignaturaId !== asistencia.AsignaturaId) {
      const asignatura = await this.asignaturaRepository.findOne({ where: { Id: updateAsistenciaDto.AsignaturaId } });
      if (!asignatura) {
        throw new NotFoundException(`Asignatura con ID ${updateAsistenciaDto.AsignaturaId} no encontrada.`);
      }
    }

    // Si se intenta actualizar PeriodoAcademicoId, verificar que el nuevo ID exista
    if (updateAsistenciaDto.PeriodoAcademicoId && updateAsistenciaDto.PeriodoAcademicoId !== asistencia.PeriodoAcademicoId) {
      const periodoAcademico = await this.periodoAcademicoRepository.findOne({ where: { Id: updateAsistenciaDto.PeriodoAcademicoId } });
      if (!periodoAcademico) {
        throw new NotFoundException(`Periodo Académico con ID ${updateAsistenciaDto.PeriodoAcademicoId} no encontrado.`);
      }
    }

    // Manejar Fecha si se actualiza
    if (updateAsistenciaDto.Fecha) {
      asistencia.Fecha = new Date(updateAsistenciaDto.Fecha);
      delete updateAsistenciaDto.Fecha; // Eliminar del DTO para que merge no intente asignar string a Date
    }

    // Aplica los cambios restantes del DTO al objeto de la asistencia existente
    this.asistenciaRepository.merge(asistencia, updateAsistenciaDto);
    return await this.asistenciaRepository.save(asistencia);
  }

  // --- NUEVO: Método para eliminar una Asistencia ---
  async remove(id: number): Promise<void> {
    const result = await this.asistenciaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Asistencia con ID ${id} no encontrada.`);
    }
  }
}
