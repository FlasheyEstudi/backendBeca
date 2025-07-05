// src/estudiante/estudiante.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<Estudiante>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(Estudiante),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
  });

  it('should create an estudiante', async () => {
    const estudianteDto: CreateEstudianteDto = {
      Nombre: 'Juan',
      Apellido: 'Pérez',
      Edad: 20,
      Correo: 'juan@example.com',
      EstadoId: 1,
      CarreraId: 1,
      Anio: 1,
      Horario: 'Diurno', // Usa un valor del enum
    };
    jest.spyOn(repository, 'create').mockReturnValue(estudianteDto as any);
    jest.spyOn(repository, 'save').mockResolvedValue({ Id: 1, ...estudianteDto } as any);

    const result = await service.saveEstudiante(estudianteDto);
    expect(result).toEqual({ NewId: 1 });
  });
});