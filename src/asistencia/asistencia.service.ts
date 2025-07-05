import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
  ) {}

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    const estudiante = await this.estudianteRepository.findOne({ where: { Id: createAsistenciaDto.EstudianteId } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

    const asignatura = await this.asignaturaRepository.findOne({ where: { Id: createAsistenciaDto.AsignaturaId } });
    if (!asignatura) throw new NotFoundException('Asignatura no encontrada');

    const asistencia = this.asistenciaRepository.create({
      estudiante,
      asignatura,
      Fecha: new Date(createAsistenciaDto.Fecha),
      Asistio: createAsistenciaDto.Asistio,
    });
    const result = await this.asistenciaRepository.save(asistencia);
    return { NewId: result.Id };
  }

  async findAll() {
    return await this.asistenciaRepository.find({ relations: ['estudiante', 'asignatura'] });
  }
}