import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'; // Añadido JoinColumn
import { Beca_Estado } from '../../beca_estado/entities/beca_estado.entity';
import { Carrera } from '../../carrera/entities/carrera.entity';
import { Asistencia } from '../../asistencia/entities/asistencia.entity';
import { Nota } from '../../nota/entities/nota.entity';

@Entity('beca_estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Apellido: string;

  @Column({ type: 'int', nullable: false })
  Edad: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Correo: string;

  @Column({ type: 'int', nullable: false })
  EstadoId: number;

  @Column({ type: 'int', nullable: false })
  CarreraId: number;

  @Column({ type: 'int', nullable: false })
  Anio: number;

  @Column({
    type: 'enum',
    enum: ['Diurno', 'Sabatino', 'Dominical'],
    default: 'Diurno',
    nullable: false,
  })
  Horario: 'Diurno' | 'Sabatino' | 'Dominical';

  @ManyToOne(() => Beca_Estado, (estado) => estado.estudiantes, { eager: true })
  @JoinColumn({ name: 'EstadoId' })
  estado: Beca_Estado;

  @ManyToOne(() => Carrera, (carrera) => carrera.estudiantes, { eager: true })
  @JoinColumn({ name: 'CarreraId' })
  carrera: Carrera;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.estudiante)
  asistencias: Asistencia[];

  @OneToMany(() => Nota, (nota) => nota.estudiante)
  notas: Nota[];
}