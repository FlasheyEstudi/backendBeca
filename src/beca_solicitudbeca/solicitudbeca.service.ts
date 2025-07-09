// src/beca_solicitudbeca/solicitudbeca.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudBeca } from './entities/solicitudbeca.entity';
import { CreateSolicitudBecaDto } from './dto/create-solicitudbeca.dto';
import { UpdateSolicitudBecaDto } from './dto/update-solicitudbeca.dto'; // Importa el DTO de actualización
import { Estudiante } from '../estudiante/entities/estudiante.entity'; // Importa Estudiante para validación
import { Beca } from '../beca/entities/beca.entity'; // Importa Beca para validación

@Injectable()
export class SolicitudBecaService {
  constructor(
    @InjectRepository(SolicitudBeca)
    private readonly solicitudBecaRepository: Repository<SolicitudBeca>,
    @InjectRepository(Estudiante) // Inyecta el repositorio de Estudiante
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Beca) // Inyecta el repositorio de Beca
    private readonly becaRepository: Repository<Beca>,
  ) {}

  // Método para crear una SolicitudBeca
  async create(createSolicitudBecaDto: CreateSolicitudBecaDto): Promise<SolicitudBeca> {
    // 1. Verificar si el EstudianteId existe
    const estudiante = await this.estudianteRepository.findOne({ where: { Id: createSolicitudBecaDto.EstudianteId } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${createSolicitudBecaDto.EstudianteId} no encontrado.`);
    }

    // 2. Verificar si el BecaId existe
    const beca = await this.becaRepository.findOne({ where: { Id: createSolicitudBecaDto.BecaId } });
    if (!beca) {
      throw new NotFoundException(`Beca con ID ${createSolicitudBecaDto.BecaId} no encontrada.`);
    }

    // Opcional: Verificar si ya existe una solicitud para el mismo estudiante y beca en estado pendiente
    const existingSolicitud = await this.solicitudBecaRepository.findOne({
      where: {
        EstudianteId: createSolicitudBecaDto.EstudianteId,
        BecaId: createSolicitudBecaDto.BecaId,
        EstadoSolicitud: 'Pendiente' // Asumiendo que solo puede haber una pendiente por estudiante/beca
      }
    });

    if (existingSolicitud) {
      throw new ConflictException(`Ya existe una solicitud pendiente para el estudiante con ID ${createSolicitudBecaDto.EstudianteId} y la beca con ID ${createSolicitudBecaDto.BecaId}.`);
    }

    // 3. Crear y guardar la nueva solicitud de beca
    const nuevaSolicitud = this.solicitudBecaRepository.create({
      ...createSolicitudBecaDto,
      FechaSolicitud: createSolicitudBecaDto.FechaSolicitud ? new Date(createSolicitudBecaDto.FechaSolicitud) : undefined,
      // EstadoSolicitud usará el default de la DB si no se proporciona
    });
    return await this.solicitudBecaRepository.save(nuevaSolicitud);
  }

  // Método para obtener todas las SolicitudesBeca
  async findAll(): Promise<SolicitudBeca[]> {
    return await this.solicitudBecaRepository.find({ relations: ['estudiante', 'beca'] }); // Incluye relaciones
  }

  // Método para obtener una SolicitudBeca por ID
  async findOne(id: number): Promise<SolicitudBeca> {
    const solicitud = await this.solicitudBecaRepository.findOne({ where: { Id: id }, relations: ['estudiante', 'beca'] });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud de Beca con ID ${id} no encontrada.`);
    }
    return solicitud;
  }

  // --- NUEVO: Método para actualizar una SolicitudBeca ---
  async update(id: number, updateSolicitudBecaDto: UpdateSolicitudBecaDto): Promise<SolicitudBeca> {
    const solicitud = await this.solicitudBecaRepository.findOne({ where: { Id: id } });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud de Beca con ID ${id} no encontrada.`);
    }

    // Si se intenta actualizar EstudianteId, verificar que el nuevo ID exista
    if (updateSolicitudBecaDto.EstudianteId && updateSolicitudBecaDto.EstudianteId !== solicitud.EstudianteId) {
      const estudiante = await this.estudianteRepository.findOne({ where: { Id: updateSolicitudBecaDto.EstudianteId } });
      if (!estudiante) {
        throw new NotFoundException(`Estudiante con ID ${updateSolicitudBecaDto.EstudianteId} no encontrado.`);
      }
    }

    // Si se intenta actualizar BecaId, verificar que el nuevo ID exista
    if (updateSolicitudBecaDto.BecaId && updateSolicitudBecaDto.BecaId !== solicitud.BecaId) {
      const beca = await this.becaRepository.findOne({ where: { Id: updateSolicitudBecaDto.BecaId } });
      if (!beca) {
        throw new NotFoundException(`Beca con ID ${updateSolicitudBecaDto.BecaId} no encontrada.`);
      }
    }

    // Manejar FechaSolicitud si se actualiza
    if (updateSolicitudBecaDto.FechaSolicitud) {
      solicitud.FechaSolicitud = new Date(updateSolicitudBecaDto.FechaSolicitud);
      delete updateSolicitudBecaDto.FechaSolicitud; // Eliminar del DTO para que merge no intente asignar string a Date
    }

    // Aplica los cambios restantes del DTO al objeto de la solicitud existente
    this.solicitudBecaRepository.merge(solicitud, updateSolicitudBecaDto);
    return await this.solicitudBecaRepository.save(solicitud);
  }

  // --- NUEVO: Método para eliminar una SolicitudBeca ---
  async remove(id: number): Promise<void> {
    const result = await this.solicitudBecaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Solicitud de Beca con ID ${id} no encontrada.`);
    }
  }
}
