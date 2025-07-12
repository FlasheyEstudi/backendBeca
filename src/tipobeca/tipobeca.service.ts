import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoBeca } from './entities/tipobeca.entity';
import { CreateTipoBecaDto } from './dto/create-tipobeca.dto';
import { UpdateTipoBecaDto } from './dto/update-tipobeca.dto';

@Injectable()
export class TipoBecaService {
  constructor(
    @InjectRepository(TipoBeca)
    private readonly tipoBecaRepository: Repository<TipoBeca>,
  ) {}

  async create(createTipoBecaDto: CreateTipoBecaDto): Promise<TipoBeca> {
    if (createTipoBecaDto.Monto < 0) {
      throw new ConflictException('El monto no puede ser negativo.');
    }
    const existingTipoBeca = await this.tipoBecaRepository.findOne({ where: { Nombre: createTipoBecaDto.Nombre } });
    if (existingTipoBeca) {
      throw new ConflictException(`El tipo de beca con nombre '${createTipoBecaDto.Nombre}' ya existe.`);
    }
    const nuevoTipoBeca = this.tipoBecaRepository.create(createTipoBecaDto);
    return await this.tipoBecaRepository.save(nuevoTipoBeca);
  }

  async findAll(): Promise<TipoBeca[]> {
    return await this.tipoBecaRepository.find({ relations: ['becas', 'requisitos'] });
  }

  async findOne(id: number): Promise<TipoBeca> {
    const tipoBeca = await this.tipoBecaRepository.findOne({ where: { Id: id }, relations: ['becas', 'requisitos'] });
    if (!tipoBeca) {
      throw new NotFoundException(`Tipo de Beca con ID ${id} no encontrado`);
    }
    return tipoBeca;
  }

  async update(id: number, updateTipoBecaDto: UpdateTipoBecaDto): Promise<TipoBeca> {
    const tipoBeca = await this.tipoBecaRepository.findOne({ where: { Id: id } });
    if (!tipoBeca) {
      throw new NotFoundException(`Tipo de Beca con ID ${id} no encontrado`);
    }
    if (updateTipoBecaDto.Monto !== undefined && updateTipoBecaDto.Monto < 0) {
      throw new ConflictException('El monto no puede ser negativo.');
    }
    if (updateTipoBecaDto.Nombre && updateTipoBecaDto.Nombre !== tipoBeca.Nombre) {
      const existingTipoBeca = await this.tipoBecaRepository.findOne({ where: { Nombre: updateTipoBecaDto.Nombre } });
      if (existingTipoBeca && existingTipoBeca.Id !== id) {
        throw new ConflictException(`El tipo de beca con nombre '${updateTipoBecaDto.Nombre}' ya existe.`);
      }
    }
    this.tipoBecaRepository.merge(tipoBeca, updateTipoBecaDto);
    return await this.tipoBecaRepository.save(tipoBeca);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tipoBecaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de Beca con ID ${id} no encontrado`);
    }
  }
}