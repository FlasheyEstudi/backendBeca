// src/beca_requisito/beca_requisito.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requisito } from './entities/requisito.entity';
import { CreateRequisitoDto } from './dto/create-requisito.dto';
import { TipoBeca } from '../tipobeca/entities/tipobeca.entity'; // Importa la entidad TipoBeca

@Injectable()
export class BecaRequisitoService {
  constructor(
    @InjectRepository(Requisito)
    private readonly requisitoRepository: Repository<Requisito>,
    @InjectRepository(TipoBeca) // ¡Inyecta el repositorio de TipoBeca!
    private readonly tipoBecaRepository: Repository<TipoBeca>,
  ) {}

  async create(createRequisitoDto: CreateRequisitoDto): Promise<Requisito> {
    // 1. Verificar si ya existe un requisito con el mismo nombre
    const existingRequisito = await this.requisitoRepository.findOne({ where: { Nombre: createRequisitoDto.Nombre } });
    if (existingRequisito) {
      throw new ConflictException(`El requisito con nombre '${createRequisitoDto.Nombre}' ya existe.`);
    }

    // 2. Verificar que el TipoBecaId exista
    const tipoBeca = await this.tipoBecaRepository.findOne({ where: { Id: createRequisitoDto.TipoBecaId } });
    if (!tipoBeca) {
      throw new NotFoundException(`Tipo de Beca con ID ${createRequisitoDto.TipoBecaId} no encontrado.`);
    }

    // 3. Crear la instancia del requisito, asignando el TipoBecaId
    const nuevoRequisito = this.requisitoRepository.create({
      Nombre: createRequisitoDto.Nombre,
      Descripcion: createRequisitoDto.Descripcion,
      TipoBecaId: createRequisitoDto.TipoBecaId, // Asigna el ID de la clave foránea
      // tipoBeca: tipoBeca, // Opcional: si quieres asignar la entidad completa
    });

    return await this.requisitoRepository.save(nuevoRequisito);
  }

  async findAll(): Promise<Requisito[]> {
    // Incluir la relación con TipoBeca para cargar los datos relacionados
    return await this.requisitoRepository.find({ relations: ['tipoBeca'] });
  }

  async findOne(id: number): Promise<Requisito> {
    const requisito = await this.requisitoRepository.findOne({ where: { Id: id }, relations: ['tipoBeca'] });
    if (!requisito) {
      throw new NotFoundException(`Requisito con ID ${id} no encontrado`);
    }
    return requisito;
  }
}
