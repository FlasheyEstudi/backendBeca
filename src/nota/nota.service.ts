import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
  ) {}

  async create(createNotaDto: CreateNotaDto) {
    const estudiante = await this.estudianteRepository.findOne({ where: { Id: createNotaDto.EstudianteId } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

    const asignatura = await this.asignaturaRepository.findOne({ where: { Id: createNotaDto.AsignaturaId } });
    if (!asignatura) throw new NotFoundException('Asignatura no encontrada');

    const nota = this.notaRepository.create({
      estudiante,
      asignatura,
      Nota: createNotaDto.Nota, // Cambiado de 'Valor' a 'Nota'
    });
    const result = await this.notaRepository.save(nota);
    return { NewId: result.Id };
  }

  async findAll() {
    return await this.notaRepository.find({ relations: ['estudiante', 'asignatura'] });
  }
}