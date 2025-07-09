// src/beca_carrera/entities/beca_carrera.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity'; // Asegúrate de importar Asignatura

@Entity('beca_carrera')
export class Carrera { // ¡NOMBRE DE LA CLASE CAMBIADO DE Beca_Carrera A Carrera!
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true }) // Añadido unique: true para Nombre
  Nombre: string;

  @Column({ type: 'enum', enum: ['Diurno', 'Sabatino', 'Dominical'], nullable: false })
  Horario: 'Diurno' | 'Sabatino' | 'Dominical'; // Columna Horario añadida

  // Relación OneToMany con Estudiante (una carrera puede tener muchos estudiantes)
  // 'carrera' es la propiedad en la entidad Estudiante que apunta a esta carrera
  @OneToMany(() => Estudiante, estudiante => estudiante.carrera) // Asegúrate de que estudiante.carrera sea la propiedad correcta en Estudiante
  estudiantes: Estudiante[];

  // Relación OneToMany con Asignatura (una carrera puede tener muchas asignaturas)
  // 'carrera' es la propiedad en la entidad Asignatura que apunta a esta carrera
  @OneToMany(() => Asignatura, asignatura => asignatura.carrera) // Asegúrate de que asignatura.carrera sea la propiedad correcta en Asignatura
  asignaturas: Asignatura[];
}
