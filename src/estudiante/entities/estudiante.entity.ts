// src/estudiante/entities/estudiante.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Beca_Estado } from '../../beca_estado/entities/beca_estado.entity'; // Asegura la ruta correcta
import { Carrera } from '../../beca_carrera/entities/beca_carrera.entity'; // Asegura la ruta correcta
import { Asistencia } from '../../asistencia/entities/asistencia.entity'; // Asegura la ruta correcta
import { Nota } from '../../nota/entities/nota.entity'; // Asegura la ruta correcta

@Entity('beca_estudiante') // Mapea a la tabla 'beca_estudiante' en tu base de datos
export class Estudiante {
  @PrimaryGeneratedColumn() // Columna de ID autoincremental y clave primaria
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Apellido: string;

  @Column({ type: 'date', nullable: true }) // Fecha de nacimiento, puede ser nula
  FechaNacimiento: Date | null; // Tipado explícito para permitir 'null'

  @Column({ type: 'varchar', length: 255, nullable: true })
  Direccion: string | null; // Tipado explícito para permitir 'null'

  @Column({ type: 'varchar', length: 20, nullable: true })
  Telefono: string | null; // Tipado explícito para permitir 'null'

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true }) // Correo electrónico, no nulo y único
  CorreoElectronico: string;

  // --- Relación ManyToOne con Beca_Estado ---
  @ManyToOne(() => Beca_Estado, (becaEstado) => becaEstado.estudiantes)
  @JoinColumn({ name: 'EstadoId' }) // Clave foránea en la DB
  estado: Beca_Estado;

  @Column({ name: 'EstadoId', type: 'int', nullable: false }) // Columna explícita para la clave foránea
  EstadoId: number;

  // --- Relación ManyToOne con Carrera ---
  @ManyToOne(() => Carrera, (carrera) => carrera.estudiantes)
  @JoinColumn({ name: 'CarreraId' }) // Clave foránea en la DB
  carrera: Carrera;

  @Column({ name: 'CarreraId', type: 'int', nullable: false }) // Columna explícita para la clave foránea
  CarreraId: number;

  // --- Relación OneToMany con Asistencia ---
  @OneToMany(() => Asistencia, (asistencia) => asistencia.estudiante)
  asistencias: Asistencia[];

  // --- Relación OneToMany con Nota ---
  @OneToMany(() => Nota, (nota) => nota.estudiante)
  notas: Nota[];
}
