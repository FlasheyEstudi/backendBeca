import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity('beca_carrera')
export class Beca_Carrera {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 100, nullable: false })
  Nombre: string;

  @Column({ type: 'enum', enum: ['Diurno', 'Sabatino', 'Dominical'], nullable: true })
  Horario: 'Diurno' | 'Sabatino' | 'Dominical';

  @OneToMany(() => Estudiante, estudiante => estudiante.Carrera)
  estudiantes: Estudiante[];
}