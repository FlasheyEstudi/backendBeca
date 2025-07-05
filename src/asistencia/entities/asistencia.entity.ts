import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm'; // Añadido JoinColumn
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';

@Entity('beca_asistencia')
export class Asistencia {
  @PrimaryGeneratedColumn()
  Id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.asistencias, { eager: true })
  @JoinColumn({ name: 'EstudianteId' })
  estudiante: Estudiante;

  @ManyToOne(() => Asignatura, (asignatura) => asignatura.asistencias, { eager: true })
  @JoinColumn({ name: 'AsignaturaId' })
  asignatura: Asignatura;

  @Column({ type: 'date', nullable: false })
  Fecha: Date;

  @Column({ type: 'tinyint', nullable: false }) // BOOLEAN en MySQL
  Asistio: boolean;
}