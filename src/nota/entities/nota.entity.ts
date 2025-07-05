import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';

@Entity('beca_nota')
export class Nota {
  @PrimaryGeneratedColumn()
  Id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.notas, { eager: true })
  @JoinColumn({ name: 'EstudianteId' })
  estudiante: Estudiante;

  @ManyToOne(() => Asignatura, (asignatura) => asignatura.notas, { eager: true })
  @JoinColumn({ name: 'AsignaturaId' })
  asignatura: Asignatura;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  Nota: number; // Cambiado de 'Valor' a 'Nota' para coincidir con la tabla

  @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  Fecha_Registro: Date; // Agregado para coincidir con la tabla
}