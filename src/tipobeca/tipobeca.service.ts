// src/tipobeca/tipobeca.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoBeca } from './entities/tipobeca.entity';
import { CreateTipoBecaDto } from './dto/create-tipobeca.dto';
import { UpdateTipoBecaDto } from './dto/update-tipobeca.dto'; // Importa el DTO de actualización

@Injectable()
export class TipoBecaService {
  constructor(
    @InjectRepository(TipoBeca)
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

  // --- NUEVO: Método para actualizar un TipoBeca ---
  async update(id: number, updateTipoBecaDto: UpdateTipoBecaDto): Promise<TipoBeca> {
    const tipoBeca = await this.tipoBecaRepository.findOne({ where: { Id: id } });
    if (!tipoBeca) {
      throw new NotFoundException(`Tipo de Beca con ID ${id} no encontrado`);
    }

    // Si se intenta cambiar el nombre, verificar que el nuevo nombre no exista ya
    if (updateTipoBecaDto.Nombre && updateTipoBecaDto.Nombre !== tipoBeca.Nombre) {
      const existingTipoBeca = await this.tipoBecaRepository.findOne({ where: { Nombre: updateTipoBecaDto.Nombre } });
      if (existingTipoBeca && existingTipoBeca.Id !== id) {
        throw new ConflictException(`El tipo de beca con nombre '${updateTipoBecaDto.Nombre}' ya existe.`);
      }
    }

    // Aplica los cambios del DTO al objeto del tipo de beca existente
    this.tipoBecaRepository.merge(tipoBeca, updateTipoBecaDto);
    return await this.tipoBecaRepository.save(tipoBeca);
  }

  // --- NUEVO: Método para eliminar un TipoBeca ---
  async remove(id: number): Promise<void> {
    const result = await this.tipoBecaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de Beca con ID ${id} no encontrado`);
    }
  }
}
