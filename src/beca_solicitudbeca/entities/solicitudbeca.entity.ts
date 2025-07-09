// src/beca_solicitudbeca/entities/solicitudbeca.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
// No necesitamos forwardRef aquí si Beca ya usa forwardRef en su OneToMany de forma adecuada.
// import { forwardRef } from '@nestjs/common';
import { Estudiante } from '../../estudiante/entities/estudiante.entity'; // Asegura la ruta correcta a Estudiante
import { Beca } from '../../beca/entities/beca.entity'; // Asegura la ruta correcta a Beca
import { AsignacionBeca } from '../../beca_asignacionbeca/entities/asignacionbeca.entity'; // Asegura la ruta correcta a AsignacionBeca

@Entity('beca_solicitudbeca')
export class SolicitudBeca { // ¡Asegúrate de que 'export' esté aquí!
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  FechaSolicitud: Date;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'Pendiente' })
  EstadoSolicitud: string; // Ej. 'Pendiente', 'Aprobada', 'Rechazada'

  // --- Relación ManyToOne con Estudiante ---
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.solicitudesBeca)
  @JoinColumn({ name: 'EstudianteId' })
  estudiante: Estudiante;

  @Column({ name: 'EstudianteId', type: 'int', nullable: false })
  EstudianteId: number;

  // --- RELACIÓN CRUCIAL: ManyToOne con Beca ---
  // 'solicitudesBeca' es la propiedad en la entidad Beca que apunta a esta solicitud
  @ManyToOne(() => Beca, (beca) => beca.solicitudesBeca) // Aquí no se usa forwardRef, ya que Beca lo usa en su OneToMany
  @JoinColumn({ name: 'BecaId' })
  beca: Beca; // ¡Esta propiedad 'beca' es necesaria para la relación inversa!

  @Column({ name: 'BecaId', type: 'int', nullable: false })
  BecaId: number;

  // --- Relación OneToMany con AsignacionBeca ---
  @OneToMany(() => AsignacionBeca, (asignacionBeca) => asignacionBeca.solicitudBeca)
  asignacionesBeca: AsignacionBeca[];
}
