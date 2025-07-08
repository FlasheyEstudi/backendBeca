// src/asistencia/asistencia.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';
import { PeriodoAcademico } from '../periodoacademico/entities/periodoacademico.entity'; // Importar la entidad PeriodoAcademico

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
    @InjectRepository(PeriodoAcademico) // ¡Inyectar el repositorio de PeriodoAcademico!
    private readonly periodoAcademicoRepository: Repository<PeriodoAcademico>,
  ) {}

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    // Verificar que el Estudiante exista
    const estudiante = await this.estudianteRepository.findOne({ where: { Id: createAsistenciaDto.EstudianteId } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${createAsistenciaDto.EstudianteId} no encontrado`);
    }

    // Verificar que la Asignatura exista
    const asignatura = await this.asignaturaRepository.findOne({ where: { Id: createAsistenciaDto.AsignaturaId } });
    if (!asignatura) {
      throw new NotFoundException(`Asignatura con ID ${createAsistenciaDto.AsignaturaId} no encontrada`);
    }

    // ¡Verificar que el Periodo Académico exista!
    const periodoAcademico = await this.periodoAcademicoRepository.findOne({ where: { Id: createAsistenciaDto.PeriodoAcademicoId } });
    if (!periodoAcademico) {
      throw new NotFoundException(`Periodo Académico con ID ${createAsistenciaDto.PeriodoAcademicoId} no encontrado`);
    }

    // Crear la instancia de Asistencia, asignando los IDs de las claves foráneas directamente
    const asistencia = this.asistenciaRepository.create({
      EstudianteId: createAsistenciaDto.EstudianteId, // Asignar el ID del estudiante
      AsignaturaId: createAsistenciaDto.AsignaturaId, // Asignar el ID de la asignatura
      PeriodoAcademicoId: createAsistenciaDto.PeriodoAcademicoId, // ¡Asignar el ID del período académico!
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
}
