// src/beca_carrera/entities/beca_carrera.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';

@Entity('beca_carrera')
export class Carrera {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  Nombre: string;

  @Column({ type: 'enum', enum: ['Diurno', 'Sabatino', 'Dominical'], nullable: false })
  Horario: 'Diurno' | 'Sabatino' | 'Dominical';

  @OneToMany(() => Estudiante, estudiante => estudiante.carrera)
  estudiantes: Estudiante[];

  @OneToMany(() => Asignatura, asignatura => asignatura.carrera)
  asignaturas: Asignatura[];
}
