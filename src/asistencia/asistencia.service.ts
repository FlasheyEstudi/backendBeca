import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Injectable()
export class AsistenciaService {
  private readonly logger = new Logger(AsistenciaService.name);

  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
  ) {}

  async saveAsistencia(createAsistenciaDto: CreateAsistenciaDto) {
    try {
      const estudiante = await this.estudianteRepository.findOneOrFail({
        where: { Id: createAsistenciaDto.Estudiante.Id },
      });
      const asignatura = await this.asignaturaRepository.findOneOrFail({
        where: { Id: createAsistenciaDto.Asignatura.Id },
      });

      const asistencia = this.asistenciaRepository.create({
        Estudiante: estudiante,
        Asignatura: asignatura,
        Fecha: createAsistenciaDto.Fecha,
        Asistio: createAsistenciaDto.Asistio,
      });
      const result = await this.asistenciaRepository.save(asistencia);
      this.logger.log(`Asistencia guardada: ${JSON.stringify(result)}`);
      return { NewId: result.Id };
    } catch (error) {
      this.logger.error('Error al guardar asistencia', error.stack);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.asistenciaRepository.find({
        relations: ['Estudiante', 'Asignatura'],
      });
      this.logger.log(`Asistencias encontradas: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error('Error al buscar asistencias', error.stack);
      throw error;
    }
  }
}