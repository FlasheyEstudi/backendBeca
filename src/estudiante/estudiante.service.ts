import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Beca_Estado } from '../beca_estado/entities/beca_estado.entity';
import { Beca_Carrera } from '../beca_carrera/entities/beca_carrera.entity';

@Injectable()
export class EstudianteService {
  private readonly logger = new Logger(EstudianteService.name);

  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Beca_Estado)
    private becaEstadoRepository: Repository<Beca_Estado>,
    @InjectRepository(Beca_Carrera)
    private becaCarreraRepository: Repository<Beca_Carrera>,
  ) {}

  async saveEstudiante(createEstudianteDto: CreateEstudianteDto) {
    try {
      // Fetch related entities by their IDs
      const estado = await this.becaEstadoRepository.findOneOrFail({
        where: { Id: createEstudianteDto.Estado.Id },
      });
      const carrera = await this.becaCarreraRepository.findOneOrFail({
        where: { Id: createEstudianteDto.Carrera.Id },
      });

      // Create student entity with Id as undefined if 0 (TypeORM will handle auto-increment)
      const estudianteData = {
        Id: createEstudianteDto.Id === 0 ? undefined : createEstudianteDto.Id,
        Nombre: createEstudianteDto.Nombre,
        Apellido: createEstudianteDto.Apellido,
        Edad: createEstudianteDto.Edad,
        Correo: createEstudianteDto.Correo,
        Estado: estado,
        Carrera: carrera,
        Anio: createEstudianteDto.Anio, // Include if defined in DTO
        Horario: createEstudianteDto.Horario, // Include if defined in DTO
      };

      const estudiante = this.estudianteRepository.create(estudianteData);
      const result = await this.estudianteRepository.save(estudiante);
      this.logger.log(`Estudiante guardado: ${JSON.stringify(result)}`);
      return { NewId: result.Id };
    } catch (error) {
      this.logger.error('Error al guardar estudiante', error.stack);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.estudianteRepository.find({
        relations: ['Estado', 'Carrera'],
      });
      this.logger.log(`Estudiantes encontrados: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error('Error al buscar estudiantes', error.stack);
      throw error;
    }
  }
}