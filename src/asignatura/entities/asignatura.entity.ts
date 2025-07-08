// src/asignatura/entities/asignatura.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'; // Añadido OneToMany
import { Carrera } from '../../carrera/entities/carrera.entity'; // Asegura la ruta correcta
import { Nota } from '../../nota/entities/nota.entity'; // Importa la entidad Nota

@Entity('beca_asignatura')
export class Asignatura {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;

  @Column({ type: 'int', nullable: false })
  Creditos: number;

  @Column({ name: 'CarreraId', type: 'int', nullable: false })
  CarreraId: number;

  @ManyToOne(() => Carrera)
  @JoinColumn({ name: 'CarreraId' })
  carrera: Carrera;

  // --- NUEVA RELACIÓN AÑADIDA ---
  @OneToMany(() => Nota, (nota) => nota.asignatura) // Define la relación OneToMany a Nota
  notas: Nota[]; // Propiedad 'notas' para la relación inversa
  // --- FIN NUEVA RELACIÓN ---
}
