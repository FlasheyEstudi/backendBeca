import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Asistencia } from '../../asistencia/entities/asistencia.entity';
import { Nota } from '../../nota/entities/nota.entity';

@Entity('beca_asignatura')
export class Asignatura {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;

  @Column({ type: 'int', nullable: false })
  Creditos: number;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.asignatura)
  asistencias: Asistencia[];

  @OneToMany(() => Nota, (nota) => nota.asignatura)
  notas: Nota[];
}