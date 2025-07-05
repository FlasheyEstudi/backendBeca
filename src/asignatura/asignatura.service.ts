import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';

@Injectable()
export class AsignaturaService {
  private readonly logger = new Logger(AsignaturaService.name);

  constructor(
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
  ) {}

  async saveAsignatura(createAsignaturaDto: CreateAsignaturaDto) {
    try {
      const asignatura = this.asignaturaRepository.create({
        Id: createAsignaturaDto.Id === 0 ? undefined : createAsignaturaDto.Id,
        Nombre: createAsignaturaDto.Nombre,
        Creditos: createAsignaturaDto.Creditos,
      });
      const result = await this.asignaturaRepository.save(asignatura);
      this.logger.log(`Asignatura guardada: ${JSON.stringify(result)}`);
      return { NewId: result.Id };
    } catch (error) {
      this.logger.error('Error al guardar asignatura', error.stack);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.asignaturaRepository.find();
      this.logger.log(`Asignaturas encontradas: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error('Error al buscar asignaturas', error.stack);
      throw error;
    }
  }
}