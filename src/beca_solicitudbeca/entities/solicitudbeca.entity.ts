// src/beca_solicitudbeca/entities/solicitudbeca.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Beca } from '../../beca/entities/beca.entity';
import { BecaAsignacionBeca } from '../../beca_asignacionbeca/entities/asignacionbeca.entity';
import { PeriodoAcademico } from '../../periodoacademico/entities/periodoacademico.entity';

@Entity('beca_solicitudbeca')
export class SolicitudBeca {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  FechaSolicitud: Date;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'Pendiente' })
  EstadoSolicitud: string;

  // --- Relación ManyToOne con Estudiante ---
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.solicitudesBeca)
  @JoinColumn({ name: 'EstudianteId' })
  estudiante: Estudiante;

  @Column({ name: 'EstudianteId', type: 'int', nullable: false })
  EstudianteId: number;

  // --- RELACIÓN CRUCIAL: ManyToOne con Beca ---
  @ManyToOne(() => Beca, (beca) => beca.solicitudesBeca)
  @JoinColumn({ name: 'BecaId' })
  beca: Beca;

  @Column({ name: 'BecaId', type: 'int', nullable: false })
  BecaId: number;

  // --- Relación ManyToOne con PeriodoAcademico ---
  @ManyToOne(() => PeriodoAcademico, (periodo) => periodo.solicitudesBeca)
  @JoinColumn({ name: 'PeriodoAcademicoId' })
  periodoAcademico: PeriodoAcademico;

  // *** CAMBIO AQUÍ: Añadido default: null ***
  // Esto es un workaround para que TypeORM no intente insertar 'DEFAULT'
  // si la columna es NOT NULL y no tiene un DEFAULT en la DB.
  @Column({ name: 'PeriodoAcademicoId', type: 'int', nullable: false, default: null })
  PeriodoAcademicoId: number;

  // --- NUEVO: Campo para la verificación manual de documentos ---
  @Column({ type: 'boolean', nullable: false, default: false })
  DocumentosVerificados: boolean;

  // --- Relación OneToMany con AsignacionBeca ---
  @OneToMany(() => BecaAsignacionBeca, (asignacionBeca) => asignacionBeca.solicitudBeca)
  asignacionesBeca: BecaAsignacionBeca[];
}
