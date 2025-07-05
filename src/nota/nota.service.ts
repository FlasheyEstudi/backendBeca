import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';

@Injectable()
export class NotaService {
  private readonly logger = new Logger(NotaService.name);

  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,
  ) {}

  async saveNota(createNotaDto: CreateNotaDto) {
    try {
      const nota = this.notaRepository.create({
        Id: createNotaDto.Id === 0 ? undefined : createNotaDto.Id,
        Estudiante: createNotaDto.Estudiante,
        Asignatura: createNotaDto.Asignatura,
        Nota: createNotaDto.Nota,
      });
      const result = await this.notaRepository.save(nota);
      this.logger.log(`Nota guardada: ${JSON.stringify(result)}`);
      return { NewId: result.Id };
    } catch (error) {
      this.logger.error('Error al guardar nota', error.stack);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.notaRepository
        .createQueryBuilder('nota')
        .leftJoinAndSelect('nota.Estudiante', 'estudiante')
        .leftJoinAndSelect('estudiante.Carrera', 'carrera')
        .leftJoinAndSelect('nota.Asignatura', 'asignatura')
        .select([
          'estudiante.Nombre AS Nombre_Estudiante',
          'estudiante.Apellido AS Apellido_Estudiante',
          'carrera.Nombre AS Nombre_Carrera',
          'asignatura.Nombre AS Nombre_Clase',
          'nota.Nota',
        ])
        .getRawMany();
      this.logger.log(`Notas encontradas: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error('Error al buscar notas', error.stack);
      throw error;
    }
  }
}