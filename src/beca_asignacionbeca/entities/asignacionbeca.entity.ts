// src/beca_asignacionbeca/entities/asignacionbeca.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SolicitudBeca } from '../../beca_solicitudbeca/entities/solicitudbeca.entity';

@Entity('beca_asignacionbeca')
export class BecaAsignacionBeca {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  FechaAsignacion: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  MontoAsignado: number;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'Pendiente' })
  EstadoAsignacion: string;

  // NUEVO: Columna para la fecha de finalización de la beca
  @Column({ type: 'date', nullable: true }) // Puede ser nula si la beca aún no ha finalizado
  FechaFinalizacion: Date;

  // Relación ManyToOne con SolicitudBeca
  @ManyToOne(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.asignacionesBeca)
  @JoinColumn({ name: 'SolicitudBecaId' })
  solicitudBeca: SolicitudBeca;

  @Column({ name: 'SolicitudBecaId', type: 'int', nullable: false })
  SolicitudBecaId: number;
}
