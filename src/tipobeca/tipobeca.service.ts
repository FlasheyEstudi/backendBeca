// src/tipobeca/tipobeca.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoBeca } from './entities/tipobeca.entity'; // Importa la entidad TipoBeca
import { CreateTipoBecaDto } from './dto/create-tipobeca-dto'; // Importa el DTO

@Injectable()
export class TipoBecaService {
  constructor(
    @InjectRepository(TipoBeca) // Inyecta el repositorio de TipoBeca
    private readonly tipoBecaRepository: Repository<TipoBeca>,
  ) {}

  async create(createTipoBecaDto: CreateTipoBecaDto): Promise<TipoBeca> {
    // Verificar si ya existe un tipo de beca con el mismo nombre para evitar duplicados
    const existingTipoBeca = await this.tipoBecaRepository.findOne({ where: { Nombre: createTipoBecaDto.Nombre } });
    if (existingTipoBeca) {
      throw new ConflictException(`El tipo de beca con nombre '${createTipoBecaDto.Nombre}' ya existe.`);
    }

    const nuevoTipoBeca = this.tipoBecaRepository.create(createTipoBecaDto);
    return await this.tipoBecaRepository.save(nuevoTipoBeca);
  }

  async findAll(): Promise<TipoBeca[]> {
    // Puedes incluir relaciones si el tipo de beca tuviera alguna (ej. requisitos asociados)
    return await this.tipoBecaRepository.find({ relations: ['requisitos'] });
  }

  async findOne(id: number): Promise<TipoBeca> {
    const tipoBeca = await this.tipoBecaRepository.findOne({ where: { Id: id }, relations: ['requisitos'] });
    if (!tipoBeca) {
      throw new NotFoundException(`Tipo de Beca con ID ${id} no encontrado`);
    }
    return tipoBeca;
  }
}
