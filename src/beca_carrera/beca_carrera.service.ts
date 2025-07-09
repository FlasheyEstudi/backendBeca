// src/beca_carrera/beca_carrera.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entities/beca_carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto'; // ¡RUTA CORREGIDA!
import { UpdateCarreraDto } from './dto/update-carrera.dto'; // ¡RUTA CORREGIDA!

@Injectable()
export class BecaCarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(createCarreraDto: CreateCarreraDto): Promise<Carrera> {
    const existingCarrera = await this.carreraRepository.findOne({ where: { Nombre: createCarreraDto.Nombre } });
    if (existingCarrera) {
      throw new ConflictException(`La carrera con nombre '${createCarreraDto.Nombre}' ya existe.`);
    }

    const nuevaCarrera = this.carreraRepository.create(createCarreraDto);
    return await this.carreraRepository.save(nuevaCarrera);
  }

  async findAll(): Promise<Carrera[]> {
    return await this.carreraRepository.find({ relations: ['estudiantes', 'asignaturas'] });
  }

  async findOne(id: number): Promise<Carrera> {
    const carrera = await this.carreraRepository.findOne({ where: { Id: id }, relations: ['estudiantes', 'asignaturas'] });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }
    return carrera;
  }

  // --- Método para actualizar una carrera ---
  async update(id: number, updateCarreraDto: UpdateCarreraDto): Promise<Carrera> {
    const carrera = await this.carreraRepository.findOne({ where: { Id: id } });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }

    // Si se intenta cambiar el nombre, verificar que el nuevo nombre no exista ya
    if (updateCarreraDto.Nombre && updateCarreraDto.Nombre !== carrera.Nombre) {
      const existingCarrera = await this.carreraRepository.findOne({ where: { Nombre: updateCarreraDto.Nombre } });
      if (existingCarrera && existingCarrera.Id !== id) {
        throw new ConflictException(`La carrera con nombre '${updateCarreraDto.Nombre}' ya existe.`);
      }
    }

    // Aplica los cambios del DTO al objeto de la carrera existente
    this.carreraRepository.merge(carrera, updateCarreraDto);
    return await this.carreraRepository.save(carrera);
  }

  // --- Método para eliminar una carrera ---
  async remove(id: number): Promise<void> {
    const result = await this.carreraRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }
  }
}
