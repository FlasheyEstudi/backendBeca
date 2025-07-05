import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beca_Carrera } from './entities/carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Injectable()
export class CarreraService {
  private readonly logger = new Logger(CarreraService.name);

  constructor(
    @InjectRepository(Beca_Carrera)
    private readonly carreraRepository: Repository<Beca_Carrera>,
  ) {}

  async saveCarrera(createCarreraDto: CreateCarreraDto) {
    try {
      const carrera = this.carreraRepository.create({
        Nombre: createCarreraDto.Nombre,
        Horario: createCarreraDto.Horario,
      });
      const result = await this.carreraRepository.save(carrera);
      this.logger.log(`Carrera guardada: ${JSON.stringify(result)}`);
      return { NewId: result.Id };
    } catch (error) {
      this.logger.error('Error al guardar carrera', error.stack);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.carreraRepository.find();
      this.logger.log(`Carreras encontradas: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error('Error al buscar carreras', error.stack);
      throw error;
    }
  }
}