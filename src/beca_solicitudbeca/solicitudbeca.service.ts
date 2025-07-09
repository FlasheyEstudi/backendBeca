// src/beca_solicitudbeca/solicitudbeca.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudBeca } from './entities/solicitudbeca.entity';
import { CreateSolicitudBecaDto } from './dto/create-solicitudbeca.dto';
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

  // --- NUEVO: Método para crear una SolicitudBeca ---
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

  // --- NUEVO: Método para obtener todas las SolicitudesBeca ---
  async findAll(): Promise<SolicitudBeca[]> {
    return await this.solicitudBecaRepository.find({ relations: ['estudiante', 'beca'] }); // Incluye relaciones
  }
}
