import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Asistencia } from '../../asistencia/entities/asistencia.entity';

@Entity('beca_asignatura')
export class Asignatura {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 100, nullable: false })
  Nombre: string;

  @Column({ nullable: false })
  Creditos: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Fecha_Creacion: Date;

  @OneToMany(() => Asistencia, asistencia => asistencia.Asignatura)
  asistencias: Asistencia[];
}