// src/asignatura/entities/asignatura.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'; // Añadido OneToMany
import { Carrera } from '../../beca_carrera/entities/beca_carrera.entity'; // Asegura la ruta correcta
import { Nota } from '../../nota/entities/nota.entity'; // Importa la entidad Nota
import { Asistencia } from '../../asistencia/entities/asistencia.entity'; // Importa la entidad Asistencia

@Entity('beca_asignatura')
export class Asignatura { // ¡Asegúrate de que 'export' esté aquí!
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;

  @Column({ type: 'int', nullable: false })
  Creditos: number;

  @Column({ name: 'CarreraId', type: 'int', nullable: false })
  CarreraId: number;

  @ManyToOne(() => Carrera, (carrera) => carrera.asignaturas) // Asegúrate de que 'asignaturas' sea la propiedad inversa en Carrera
  @JoinColumn({ name: 'CarreraId' })
  carrera: Carrera;

  // --- RELACIÓN AÑADIDA: OneToMany con Nota ---
  @OneToMany(() => Nota, (nota) => nota.asignatura) // Define la relación OneToMany a Nota
  notas: Nota[]; // Propiedad 'notas' para la relación inversa

  // --- RELACIÓN AÑADIDA: OneToMany con Asistencia ---
  @OneToMany(() => Asistencia, (asistencia) => asistencia.asignatura) // Define la relación OneToMany a Asistencia
  asistencias: Asistencia[]; // ¡Propiedad 'asistencias' necesaria para la relación inversa!
  // --- FIN NUEVAS RELACIONES ---
}
