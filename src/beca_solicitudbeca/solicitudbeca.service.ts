// src/beca_solicitudbeca/solicitudbeca.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudBeca } from './entities/solicitudbeca.entity';
import { CreateSolicitudBecaDto } from './dto/create-solicitudbeca.dto';
import { UpdateSolicitudBecaDto } from './dto/update-solicitudbeca.dto';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Beca } from '../beca/entities/beca.entity';
import { PeriodoAcademico } from '../periodoacademico/entities/periodoacademico.entity';

@Injectable()
export class SolicitudBecaService {
  constructor(
    @InjectRepository(SolicitudBeca)
    private readonly solicitudBecaRepository: Repository<SolicitudBeca>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Beca)
    private readonly becaRepository: Repository<Beca>,
    @InjectRepository(PeriodoAcademico)
    private readonly periodoAcademicoRepository: Repository<PeriodoAcademico>,
  ) {}

  async create(createSolicitudBecaDto: CreateSolicitudBecaDto): Promise<SolicitudBeca> {
    console.log('createSolicitudBecaDto recibido en servicio:', createSolicitudBecaDto);

    // Validar que PeriodoAcademicoId no sea 0 o nulo/indefinido
    if (!createSolicitudBecaDto.PeriodoAcademicoId) {
      throw new BadRequestException('El ID del período académico es requerido y debe ser un valor válido (no 0).');
    }

    const estudiante = await this.estudianteRepository.findOne({ where: { Id: createSolicitudBecaDto.EstudianteId } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${createSolicitudBecaDto.EstudianteId} no encontrado`);
    }

    const beca = await this.becaRepository.findOne({ where: { Id: createSolicitudBecaDto.BecaId } });
    if (!beca) {
      throw new NotFoundException(`Beca con ID ${createSolicitudBecaDto.BecaId} no encontrada`);
    }

    const periodoAcademico = await this.periodoAcademicoRepository.findOne({ where: { Id: createSolicitudBecaDto.PeriodoAcademicoId } });
    if (!periodoAcademico) {
      throw new NotFoundException(`Período académico con ID ${createSolicitudBecaDto.PeriodoAcademicoId} no encontrado`);
    }

    // Crear la instancia de la entidad directamente desde el DTO
    const nuevaSolicitud = this.solicitudBecaRepository.create(createSolicitudBecaDto);

    // Asignar las entidades de relación si es necesario (TypeORM usará los IDs del DTO, pero es buena práctica)
    nuevaSolicitud.estudiante = estudiante;
    nuevaSolicitud.beca = beca;
    nuevaSolicitud.periodoAcademico = periodoAcademico;

    // Asegurar que FechaSolicitud sea un objeto Date
    if (typeof createSolicitudBecaDto.FechaSolicitud === 'string') {
      nuevaSolicitud.FechaSolicitud = new Date(createSolicitudBecaDto.FechaSolicitud);
    } else if (!nuevaSolicitud.FechaSolicitud) {
        nuevaSolicitud.FechaSolicitud = new Date();
    }
    
    // Asegurar que DocumentosVerificados tenga un valor booleano
    if (typeof createSolicitudBecaDto.DocumentosVerificados !== 'boolean') {
        nuevaSolicitud.DocumentosVerificados = false; // Valor por defecto si no se proporciona
    }


    console.log('Objeto nuevaSolicitud antes de guardar:', nuevaSolicitud);
    return await this.solicitudBecaRepository.save(nuevaSolicitud);
  }

  // ... (El resto de los métodos findAll, findOne, update, remove no han cambiado en esta revisión)

  async findAll(): Promise<SolicitudBeca[]> {
    return await this.solicitudBecaRepository.find({
      relations: ['estudiante', 'beca', 'periodoAcademico'],
    });
  }

  async findOne(id: number): Promise<SolicitudBeca> {
    const solicitud = await this.solicitudBecaRepository.findOne({
      where: { Id: id },
      relations: ['estudiante', 'beca', 'periodoAcademico'],
    });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud de beca con ID ${id} no encontrada`);
    }
    return solicitud;
  }

  async update(id: number, updateSolicitudBecaDto: UpdateSolicitudBecaDto): Promise<SolicitudBeca> {
    const solicitud = await this.solicitudBecaRepository.findOne({ where: { Id: id } });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud de beca con ID ${id} no encontrada`);
    }

    if (updateSolicitudBecaDto.EstudianteId) {
      const estudiante = await this.estudianteRepository.findOne({ where: { Id: updateSolicitudBecaDto.EstudianteId } });
      if (!estudiante) {
        throw new NotFoundException(`Estudiante con ID ${updateSolicitudBecaDto.EstudianteId} no encontrado`);
      }
      solicitud.estudiante = estudiante;
      solicitud.EstudianteId = updateSolicitudBecaDto.EstudianteId;
    }

    if (updateSolicitudBecaDto.BecaId) {
      const beca = await this.becaRepository.findOne({ where: { Id: updateSolicitudBecaDto.BecaId } });
      if (!beca) {
        throw new NotFoundException(`Beca con ID ${updateSolicitudBecaDto.BecaId} no encontrada`);
      }
      solicitud.beca = beca;
      solicitud.BecaId = updateSolicitudBecaDto.BecaId;
    }

    if (updateSolicitudBecaDto.PeriodoAcademicoId) {
      const periodoAcademico = await this.periodoAcademicoRepository.findOne({ where: { Id: updateSolicitudBecaDto.PeriodoAcademicoId } });
      if (!periodoAcademico) {
        throw new NotFoundException(`Período académico con ID ${updateSolicitudBecaDto.PeriodoAcademicoId} no encontrado`);
      }
      solicitud.periodoAcademico = periodoAcademico;
      solicitud.PeriodoAcademicoId = updateSolicitudBecaDto.PeriodoAcademicoId;
    }

    this.solicitudBecaRepository.merge(solicitud, updateSolicitudBecaDto);
    return await this.solicitudBecaRepository.save(solicitud);
  }

  async remove(id: number): Promise<void> {
    const result = await this.solicitudBecaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Solicitud de beca con ID ${id} no encontrada`);
    }
  }
}
