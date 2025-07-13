// src/periodoacademico/entities/periodoacademico.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SolicitudBeca } from '../../beca_solicitudbeca/entities/solicitudbeca.entity'; // Asegúrate de que esta ruta sea correcta
import { Asistencia } from '../../asistencia/entities/asistencia.entity'; // Asegura la ruta correcta
import { Nota } from '../../nota/entities/nota.entity'; // Asegura la ruta correcta

@Entity('beca_periodo_academico') // Mapea a la tabla 'beca_periodo_academico' en tu base de datos
export class PeriodoAcademico { // ¡Asegúrate de que 'export' esté aquí!
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  Nombre: string; // Ej. "Primer Semestre 2025"

  @Column({ type: 'date', nullable: false })
  FechaInicio: Date;

  @Column({ type: 'date', nullable: false })
  FechaFin: Date;

  // Relación OneToMany con Asistencia
  @OneToMany(() => Asistencia, (asistencia) => asistencia.periodoAcademico)
  asistencias: Asistencia[];

  // Relación OneToMany con Nota
  @OneToMany(() => Nota, (nota) => nota.periodoAcademico)
  notas: Nota[];

  // --- NUEVO: Relación OneToMany con SolicitudBeca ---
  // Esta es la propiedad inversa necesaria para la relación ManyToOne en SolicitudBeca.
  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.periodoAcademico)
  solicitudesBeca: SolicitudBeca[];
}
