import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('beca_solicitudbeca')
export class SolicitudBeca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estudianteId: number;

  @Column()
  tipoBecaId: number;

  @Column()
  periodoId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column()
  estadoId: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fechaSolicitud: Date;
}