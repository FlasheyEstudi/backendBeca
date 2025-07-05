import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity('beca_carrera')
export class Beca_Carrera {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 100, nullable: false })
  Nombre: string;

  @OneToMany(() => Estudiante, estudiante => estudiante.Carrera)
  estudiantes: Estudiante[];
}