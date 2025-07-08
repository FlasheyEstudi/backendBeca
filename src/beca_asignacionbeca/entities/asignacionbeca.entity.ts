import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('beca_asignacionbeca')
export class AsignacionBeca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  solicitudId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column()
  estadoId: number;

  @Column()
  periodoId: number;

  @Column({ nullable: true })
  observaciones: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fechaAsignacion: Date;

  @Column({ nullable: true })
  asignadoPorEstudianteId: number;
}