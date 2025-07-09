// src/estudiante/estudiante.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto'; // Importa el DTO de actualización
import { Beca_Estado } from '../beca_estado/entities/beca_estado.entity';
import { Carrera } from '../beca_carrera/entities/beca_carrera.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Beca_Estado)
    private readonly becaEstadoRepository: Repository<Beca_Estado>,
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    // Verificar si el EstadoId existe
    const estado = await this.becaEstadoRepository.findOne({ where: { Id: createEstudianteDto.EstadoId } });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${createEstudianteDto.EstadoId} no encontrado.`);
    }

    // Verificar si el CarreraId existe
    const carrera = await this.carreraRepository.findOne({ where: { Id: createEstudianteDto.CarreraId } });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${createEstudianteDto.CarreraId} no encontrada.`);
    }

    // Verificar si el CorreoElectronico ya existe
    const existingEstudiante = await this.estudianteRepository.findOne({ where: { CorreoElectronico: createEstudianteDto.CorreoElectronico } });
    if (existingEstudiante) {
      throw new ConflictException(`El estudiante con correo '${createEstudianteDto.CorreoElectronico}' ya existe.`);
    }

    // Crear la instancia de Estudiante de forma explícita para un mejor control de tipos
    const estudiante = new Estudiante();
    estudiante.Nombre = createEstudianteDto.Nombre;
    estudiante.Apellido = createEstudianteDto.Apellido;
    estudiante.CorreoElectronico = createEstudianteDto.CorreoElectronico;
    estudiante.EstadoId = createEstudianteDto.EstadoId;
    estudiante.CarreraId = createEstudianteDto.CarreraId;

    // Manejar FechaNacimiento, Direccion, Telefono que son opcionales y pueden ser null
    if (createEstudianteDto.FechaNacimiento) {
      estudiante.FechaNacimiento = new Date(createEstudianteDto.FechaNacimiento);
    } else {
      estudiante.FechaNacimiento = null; // Asignar null si no se proporciona
    }

    estudiante.Direccion = createEstudianteDto.Direccion || null; // Asignar null si es undefined/vacío
    estudiante.Telefono = createEstudianteDto.Telefono || null; // Asignar null si es undefined/vacío

    return await this.estudianteRepository.save(estudiante);
  }

  async findAll(): Promise<Estudiante[]> {
    return await this.estudianteRepository.find({ relations: ['estado', 'carrera'] });
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { Id: id },
      relations: ['estado', 'carrera'],
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
    }
    return estudiante;
  }

  // --- NUEVO: Método para actualizar un Estudiante ---
  async update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({ where: { Id: id } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
    }

    // Si se intenta actualizar EstadoId, verificar que el nuevo ID exista
    if (updateEstudianteDto.EstadoId && updateEstudianteDto.EstadoId !== estudiante.EstadoId) {
      const estado = await this.becaEstadoRepository.findOne({ where: { Id: updateEstudianteDto.EstadoId } });
      if (!estado) {
        throw new NotFoundException(`Estado con ID ${updateEstudianteDto.EstadoId} no encontrado.`);
      }
    }

    // Si se intenta actualizar CarreraId, verificar que el nuevo ID exista
    if (updateEstudianteDto.CarreraId && updateEstudianteDto.CarreraId !== estudiante.CarreraId) {
      const carrera = await this.carreraRepository.findOne({ where: { Id: updateEstudianteDto.CarreraId } });
      if (!carrera) {
        throw new NotFoundException(`Carrera con ID ${updateEstudianteDto.CarreraId} no encontrada.`);
      }
    }

    // Si se intenta actualizar CorreoElectronico, verificar que el nuevo correo no exista ya en otro estudiante
    if (updateEstudianteDto.CorreoElectronico && updateEstudianteDto.CorreoElectronico !== estudiante.CorreoElectronico) {
      const existingEstudiante = await this.estudianteRepository.findOne({ where: { CorreoElectronico: updateEstudianteDto.CorreoElectronico } });
      if (existingEstudiante && existingEstudiante.Id !== id) {
        throw new ConflictException(`El estudiante con correo '${updateEstudianteDto.CorreoElectronico}' ya existe.`);
      }
    }

    // Manejar FechaNacimiento si se actualiza
    if (updateEstudianteDto.FechaNacimiento) {
      estudiante.FechaNacimiento = new Date(updateEstudianteDto.FechaNacimiento);
      delete updateEstudianteDto.FechaNacimiento; // Eliminar del DTO para que merge no intente asignar string a Date
    }

    // Aplica los cambios restantes del DTO al objeto del estudiante existente
    this.estudianteRepository.merge(estudiante, updateEstudianteDto);
    return await this.estudianteRepository.save(estudiante);
  }

  // --- NUEVO: Método para eliminar un Estudiante ---
  async remove(id: number): Promise<void> {
    const result = await this.estudianteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
    }
  }
}
