import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Beca_Estado } from '../../beca_estado/entities/beca_estado.entity';
import { Beca_Carrera } from '../../beca_carrera/entities/beca_carrera.entity';
import { Nota } from '../../nota/entities/nota.entity';
import { Asistencia } from '../../asistencia/entities/asistencia.entity';

@Entity('beca_estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 50, nullable: false })
  Nombre: string;

  @Column({ length: 50, nullable: false })
  Apellido: string;

  @Column({ nullable: false })
  Edad: number;

  @Column({ length: 100, nullable: false, unique: true })
  Correo: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Fecha_Registro: Date;

  @Column({ type: 'datetime', nullable: true })
  Fecha_Modificacion: Date;

  @ManyToOne(() => Beca_Estado, estado => estado.estudiantes, { eager: true })
  Estado: Beca_Estado;

  @ManyToOne(() => Beca_Carrera, carrera => carrera.estudiantes, { eager: true })
  Carrera: Beca_Carrera;

  @OneToMany(() => Nota, nota => nota.Estudiante)
  notas: Nota[];

  @Column({ type: 'int', nullable: true })
  Anio: number;

  @Column({ type: 'enum', enum: ['Diurno', 'Sabatino', 'Dominical'], nullable: true })
  Horario: 'Diurno' | 'Sabatino' | 'Dominical';

  @OneToMany(() => Asistencia, asistencia => asistencia.Estudiante) // Nueva relación
  asistencias: Asistencia[];
}