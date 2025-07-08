// src/beca_estado/beca_estado.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // Añadido NotFoundException para findOne
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beca_Estado } from './entities/beca_estado.entity';
import { CreateBecaEstadoDto } from './dto/beca_estado.dto'; // Importar el DTO

@Injectable()
export class BecaEstadoService {
  constructor(
    @InjectRepository(Beca_Estado)
    private readonly becaEstadoRepository: Repository<Beca_Estado>,
  ) {}

  // --- Método para crear un nuevo estado ---
  async create(createBecaEstadoDto: CreateBecaEstadoDto): Promise<Beca_Estado> {
    const nuevoEstado = this.becaEstadoRepository.create(createBecaEstadoDto);
    return await this.becaEstadoRepository.save(nuevoEstado);
  }
  // --- Fin método create ---

  async findAll(): Promise<Beca_Estado[]> { // Añadido Promise<Beca_Estado[]> para tipado
    return await this.becaEstadoRepository.find();
  }

  async findOne(id: number): Promise<Beca_Estado> { // Añadido Promise<Beca_Estado> para tipado
    const estado = await this.becaEstadoRepository.findOne({ where: { Id: id } });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`); // Usar NotFoundException
    }
    return estado;
  }
}
