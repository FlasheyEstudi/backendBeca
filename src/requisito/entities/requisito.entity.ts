// src/requisito/entities/requisito.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TipoBeca } from '../../tipobeca/entities/tipobeca.entity'; // Asegura la ruta correcta

@Entity('beca_requisito') // Mapea a la tabla 'beca_requisito' en tu base de datos
export class Requisito {
  @PrimaryGeneratedColumn() // Columna de ID autoincremental y clave primaria
  Id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  Nombre: string;

  @Column({ type: 'text', nullable: true })
  Descripcion: string;

  // --- NUEVAS COLUMNAS REQUERIDAS POR EL SP ---

  @Column({ name: 'AsignaturaId', type: 'int', nullable: true }) // Puede ser nulo si el requisito no es de asignatura específica
  AsignaturaId: number | null;

  @Column({ type: 'varchar', length: 50, nullable: false }) // Ej. 'NOTA', 'ASISTENCIA', 'DOCUMENTO', etc.
  Tipo: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true }) // Valor mínimo para notas o asistencia (ej. 70.00, 85.50)
  ValorMinimo: number | null;

  @Column({ type: 'boolean', default: true, nullable: false }) // Indica si el requisito es obligatorio
  EsObligatorio: boolean;

  // --- Relación ManyToOne con TipoBeca ---
  @ManyToOne(() => TipoBeca, (tipoBeca) => tipoBeca.requisitos)
  @JoinColumn({ name: 'TipoBecaId' })
  tipoBeca: TipoBeca;

  @Column({ name: 'TipoBecaId', type: 'int', nullable: false })
  TipoBecaId: number;
}
