// src/estudiante/entities/estudiante.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Beca_Estado } from '../../beca_estado/entities/beca_estado.entity';
import { Carrera } from '../../beca_carrera/entities/beca_carrera.entity';
import { Asistencia } from '../../asistencia/entities/asistencia.entity';
import { Nota } from '../../nota/entities/nota.entity';
import { SolicitudBeca } from '../../beca_solicitudbeca/entities/solicitudbeca.entity'; // Importa SolicitudBeca

@Entity('beca_estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Apellido: string;

  @Column({ type: 'date', nullable: true })
  FechaNacimiento: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Direccion: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  Telefono: string | null;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  CorreoElectronico: string;

  @ManyToOne(() => Beca_Estado, (becaEstado) => becaEstado.estudiantes)
  @JoinColumn({ name: 'EstadoId' })
  estado: Beca_Estado;

  @Column({ name: 'EstadoId', type: 'int', nullable: false })
  EstadoId: number;

  @ManyToOne(() => Carrera, (carrera) => carrera.estudiantes)
  @JoinColumn({ name: 'CarreraId' })
  carrera: Carrera;

  @Column({ name: 'CarreraId', type: 'int', nullable: false })
  CarreraId: number;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.estudiante)
  asistencias: Asistencia[];

  @OneToMany(() => Nota, (nota) => nota.estudiante)
  notas: Nota[];

  // --- NUEVA RELACIÓN AÑADIDA: OneToMany con SolicitudBeca ---
  // 'estudiante' es la propiedad en la entidad SolicitudBeca que apunta a este estudiante
  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.estudiante)
  solicitudesBeca: SolicitudBeca[];
  // --- FIN NUEVA RELACIÓN ---
}
