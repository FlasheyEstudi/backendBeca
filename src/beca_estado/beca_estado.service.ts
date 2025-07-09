// src/beca_estado/beca_estado.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beca_Estado } from './entities/beca_estado.entity';
import { CreateBecaEstadoDto } from './dto/create-beca_estado.dto';
import { UpdateBecaEstadoDto } from './dto/update-beca_estado.dto'; // Importa el DTO de actualización

@Injectable()
export class BecaEstadoService {
  constructor(
    @InjectRepository(Beca_Estado)
    private readonly becaEstadoRepository: Repository<Beca_Estado>,
  ) {}

  // Método para crear un nuevo estado
  async create(createBecaEstadoDto: CreateBecaEstadoDto): Promise<Beca_Estado> {
    const existingEstado = await this.becaEstadoRepository.findOne({ where: { Nombre: createBecaEstadoDto.Nombre } });
    if (existingEstado) {
      throw new ConflictException(`El estado con nombre '${createBecaEstadoDto.Nombre}' ya existe.`);
    }
    const nuevoEstado = this.becaEstadoRepository.create(createBecaEstadoDto);
    return await this.becaEstadoRepository.save(nuevoEstado);
  }

  // Método para obtener todos los estados
  async findAll(): Promise<Beca_Estado[]> {
    return await this.becaEstadoRepository.find();
  }

  // Método para obtener un estado por ID
  async findOne(id: number): Promise<Beca_Estado> {
    const estado = await this.becaEstadoRepository.findOne({ where: { Id: id } });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }
    return estado;
  }

  // --- NUEVO: Método para actualizar un estado ---
  async update(id: number, updateBecaEstadoDto: UpdateBecaEstadoDto): Promise<Beca_Estado> {
    const estado = await this.becaEstadoRepository.findOne({ where: { Id: id } });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }

    // Si se intenta cambiar el nombre, verificar que el nuevo nombre no exista ya
    if (updateBecaEstadoDto.Nombre && updateBecaEstadoDto.Nombre !== estado.Nombre) {
      const existingEstado = await this.becaEstadoRepository.findOne({ where: { Nombre: updateBecaEstadoDto.Nombre } });
      if (existingEstado && existingEstado.Id !== id) {
        throw new ConflictException(`El estado con nombre '${updateBecaEstadoDto.Nombre}' ya existe.`);
      }
    }

    // Aplica los cambios del DTO al objeto del estado existente
    this.becaEstadoRepository.merge(estado, updateBecaEstadoDto);
    return await this.becaEstadoRepository.save(estado);
  }

  // --- NUEVO: Método para eliminar un estado ---
  async remove(id: number): Promise<void> {
    const result = await this.becaEstadoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }
  }
}
