// src/requisito/requisito.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requisito } from './entities/requisito.entity';
import { CreateRequisitoDto } from './dto/create-requisito.dto';
import { UpdateRequisitoDto } from './dto/update-requisito.dto'; // Import the update DTO
import { TipoBeca } from '../tipobeca/entities/tipobeca.entity'; // Import TipoBeca for validation

@Injectable()
export class BecaRequisitoService {
  constructor(
    @InjectRepository(Requisito)
    private readonly requisitoRepository: Repository<Requisito>,
    @InjectRepository(TipoBeca) // Inject TipoBeca repository
    private readonly tipoBecaRepository: Repository<TipoBeca>,
  ) {}

  async create(createRequisitoDto: CreateRequisitoDto): Promise<Requisito> {
    // 1. Verify if a requirement with the same name already exists
    const existingRequisito = await this.requisitoRepository.findOne({ where: { Nombre: createRequisitoDto.Nombre } });
    if (existingRequisito) {
      throw new ConflictException(`The requirement with name '${createRequisitoDto.Nombre}' already exists.`);
    }

    // 2. Verify that TipoBecaId exists
    const tipoBeca = await this.tipoBecaRepository.findOne({ where: { Id: createRequisitoDto.TipoBecaId } });
    if (!tipoBeca) {
      throw new NotFoundException(`Scholarship Type with ID ${createRequisitoDto.TipoBecaId} not found.`);
    }

    // 3. Create the requirement instance
    const nuevoRequisito = this.requisitoRepository.create({
      Nombre: createRequisitoDto.Nombre,
      Descripcion: createRequisitoDto.Descripcion,
      TipoBecaId: createRequisitoDto.TipoBecaId,
    });

    return await this.requisitoRepository.save(nuevoRequisito);
  }

  async findAll(): Promise<Requisito[]> {
    return await this.requisitoRepository.find({ relations: ['tipoBeca'] }); // Include TipoBeca relation
  }

  async findOne(id: number): Promise<Requisito> {
    const requisito = await this.requisitoRepository.findOne({ where: { Id: id }, relations: ['tipoBeca'] });
    if (!requisito) {
      throw new NotFoundException(`Requirement with ID ${id} not found`);
    }
    return requisito;
  }

  // --- NEW: Method to update a Requisito ---
  async update(id: number, updateRequisitoDto: UpdateRequisitoDto): Promise<Requisito> {
    const requisito = await this.requisitoRepository.findOne({ where: { Id: id } });
    if (!requisito) {
      throw new NotFoundException(`Requirement with ID ${id} not found`);
    }

    // If TipoBecaId is being updated, verify that the new ID exists
    if (updateRequisitoDto.TipoBecaId && updateRequisitoDto.TipoBecaId !== requisito.TipoBecaId) {
      const tipoBeca = await this.tipoBecaRepository.findOne({ where: { Id: updateRequisitoDto.TipoBecaId } });
      if (!tipoBeca) {
        throw new NotFoundException(`Scholarship Type with ID ${updateRequisitoDto.TipoBecaId} not found.`);
      }
    }

    // If the name is being changed, verify that the new name doesn't already exist
    if (updateRequisitoDto.Nombre && updateRequisitoDto.Nombre !== requisito.Nombre) {
      const existingRequisito = await this.requisitoRepository.findOne({ where: { Nombre: updateRequisitoDto.Nombre } });
      if (existingRequisito && existingRequisito.Id !== id) {
        throw new ConflictException(`The requirement with name '${updateRequisitoDto.Nombre}' already exists.`);
      }
    }

    // Apply changes from the DTO to the existing requirement object
    this.requisitoRepository.merge(requisito, updateRequisitoDto);
    return await this.requisitoRepository.save(requisito);
  }

  // --- NEW: Method to delete a Requisito ---
  async remove(id: number): Promise<void> {
    const result = await this.requisitoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Requirement with ID ${id} not found`);
    }
  }
}
