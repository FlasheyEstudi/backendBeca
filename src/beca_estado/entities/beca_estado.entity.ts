import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity('beca_estado')
export class Beca_Estado {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 50, nullable: false })
  Nombre: string;

  @OneToMany(() => Estudiante, estudiante => estudiante.Estado)
  estudiantes: Estudiante[];
}