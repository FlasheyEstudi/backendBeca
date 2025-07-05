import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity('beca_carrera')
export class Carrera {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.carrera)
  estudiantes: Estudiante[];
}