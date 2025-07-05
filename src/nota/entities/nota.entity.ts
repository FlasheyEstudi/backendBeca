import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';

@Entity('beca_nota')
export class Nota {
  @PrimaryGeneratedColumn()
  Id: number;

  @ManyToOne(() => Estudiante, { eager: true })
  Estudiante: Estudiante;

  @ManyToOne(() => Asignatura, { eager: true })
  Asignatura: Asignatura;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  Nota: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Fecha_Registro: Date;
}