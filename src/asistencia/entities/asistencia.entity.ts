import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';

@Entity('beca_asistencia')
export class Asistencia {
  @PrimaryGeneratedColumn()
  Id: number;

  @ManyToOne(() => Estudiante, { eager: true })
  @JoinColumn({ name: 'EstudianteId' })
  Estudiante: Estudiante;

  @ManyToOne(() => Asignatura, { eager: true })
  @JoinColumn({ name: 'AsignaturaId' })
  Asignatura: Asignatura;

  @Column({ type: 'date', nullable: false })
  Fecha: Date;

  @Column({ type: 'boolean', default: true })
  Asistio: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Fecha_Registro: Date;
}