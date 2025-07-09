// src/periodoacademico/periodoacademico.service.ts
import { Injectable, ConflictException } from '@nestjs/common'; // Añadido ConflictException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeriodoAcademico } from './entities/periodoacademico.entity';
import { CreatePeriodoAcademicoDto } from './dto/create-periodoacademico.dto'; // Importa el DTO

@Injectable()
export class PeriodoAcademicoService {
  constructor(
    @InjectRepository(PeriodoAcademico)
    private readonly periodoAcademicoRepository: Repository<PeriodoAcademico>,
  ) {}

  async create(createPeriodoAcademicoDto: CreatePeriodoAcademicoDto): Promise<PeriodoAcademico> {
    // Verificar si ya existe un período académico con el mismo nombre para evitar duplicados
    const existingPeriodo = await this.periodoAcademicoRepository.findOne({ where: { Nombre: createPeriodoAcademicoDto.Nombre } });
    if (existingPeriodo) {
      throw new ConflictException(`El período académico con nombre '${createPeriodoAcademicoDto.Nombre}' ya existe.`);
    }

    // Crear la instancia del período académico
    const nuevoPeriodo = this.periodoAcademicoRepository.create({
      Nombre: createPeriodoAcademicoDto.Nombre,
      FechaInicio: new Date(createPeriodoAcademicoDto.FechaInicio), // Convertir a Date
      FechaFin: new Date(createPeriodoAcademicoDto.FechaFin),       // Convertir a Date
    });
    return await this.periodoAcademicoRepository.save(nuevoPeriodo);
  }

  async findAll() {
    return await this.periodoAcademicoRepository.find();
  }
}
