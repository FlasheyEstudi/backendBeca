// src/beca_carrera/entities/beca_carrera.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';

@Entity('beca_carrera')
export class Carrera {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true }) // Añadido unique: true para Nombre
  Nombre: string;

  // --- NUEVA COLUMNA AÑADIDA: Horario ---
  @Column({ type: 'enum', enum: ['Diurno', 'Sabatino', 'Dominical'], nullable: false })
  Horario: 'Diurno' | 'Sabatino' | 'Dominical';
  // --- FIN NUEVA COLUMNA ---

  // Relación OneToMany con Estudiante (una carrera puede tener muchos estudiantes)
  @OneToMany(() => Estudiante, estudiante => estudiante.carrera)
  estudiantes: Estudiante[];

  // Relación OneToMany con Asignatura (una carrera puede tener muchas asignaturas)
  @OneToMany(() => Asignatura, asignatura => asignatura.carrera)
  asignaturas: Asignatura[];
}
