// src/beca_asignacionbeca/entities/asignacionbeca.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// No necesitamos importar forwardRef aquí para este uso en el decorador de TypeORM.
// import { forwardRef } from '@nestjs/common';
import { SolicitudBeca } from '../../beca_solicitudbeca/entities/solicitudbeca.entity'; // Asegura la ruta correcta a SolicitudBeca

@Entity('beca_asignacionbeca')
export class AsignacionBeca {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  FechaAsignacion: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  MontoAsignado: number;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'Asignada' })
  EstadoAsignacion: string; // Ej. 'Asignada', 'Cancelada'

  // --- Relación ManyToOne con SolicitudBeca (¡CORREGIDO: Sin forwardRef en el primer argumento!) ---
  // El primer argumento es una función que devuelve directamente la clase SolicitudBeca
  // 'asignacionesBeca' es la propiedad en la entidad SolicitudBeca que apunta a esta asignación
  @ManyToOne(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.asignacionesBeca)
  @JoinColumn({ name: 'SolicitudBecaId' })
  solicitudBeca: SolicitudBeca; // Propiedad 'solicitudBeca' para la relación inversa

  @Column({ name: 'SolicitudBecaId', type: 'int', nullable: false })
  SolicitudBecaId: number;
}
