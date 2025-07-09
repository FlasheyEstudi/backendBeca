// src/nota/nota.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { Estudiante } from '../estudiante/entities/estudiante.entity'; // Importar la entidad Estudiante
import { Asignatura } from '../asignatura/entities/asignatura.entity'; // Importar la entidad Asignatura
import { PeriodoAcademico } from '../periodoacademico/entities/periodoacademico.entity'; // Importar la entidad PeriodoAcademico

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,
    @InjectRepository(Estudiante) // Inyectar el repositorio de Estudiante
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Asignatura) // Inyectar el repositorio de Asignatura
    private readonly asignaturaRepository: Repository<Asignatura>,
    @InjectRepository(PeriodoAcademico) // Inyectar el repositorio de PeriodoAcademico
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

    // 4. Crear la instancia de Nota, asignando los IDs de las claves foráneas directamente
    const nota = this.notaRepository.create({
      Calificacion: createNotaDto.Calificacion,
      EstudianteId: createNotaDto.EstudianteId,
      AsignaturaId: createNotaDto.AsignaturaId,
      PeriodoAcademicoId: createNotaDto.PeriodoAcademicoId,
      // FechaRegistro se manejará automáticamente por el default de la base de datos si está configurado en la entidad
    });

    const result = await this.notaRepository.save(nota);
    return { NewId: result.Id }; // Aseguramos que result es una sola entidad y tiene .Id
  }

  async findAll() {
    // Incluir las relaciones para que se carguen los datos de estudiante, asignatura y periodoAcademico
    return await this.notaRepository.find({ relations: ['estudiante', 'asignatura', 'periodoAcademico'] });
  }
}
