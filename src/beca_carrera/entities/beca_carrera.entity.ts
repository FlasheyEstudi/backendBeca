import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

// src/beca_carrera/entities/beca_carrera.entity.ts

@Entity('beca_carrera')
export class Beca_Carrera {
  // ... (columnas)

  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Nombre: string;

  // CORRECCIÓN: Relación correcta con Estudiante
  @OneToMany(() => Estudiante, estudiante => estudiante.CarreraId)
  estudiantes: Estudiante[];
}


 