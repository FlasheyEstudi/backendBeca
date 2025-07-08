// src/beca_estado/entities/beca_estado.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity'; // Asegura que esta ruta sea correcta

@Entity('beca_estado') // Mapea a la tabla 'beca_estado' en tu base de datos
export class Beca_Estado {
  @PrimaryGeneratedColumn() // Columna de ID autoincremental y clave primaria
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false }) // Columna para el nombre del estado
  Nombre: string;

  // Relación OneToMany con Estudiante (un estado puede tener muchos estudiantes)
  // 'estudiantes' es la propiedad en la entidad Estudiante que apunta a este estado
  @OneToMany(() => Estudiante, (estudiante) => estudiante.estado)
  estudiantes: Estudiante[];
}
