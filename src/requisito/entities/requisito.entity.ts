// src/requisito/entities/requisito.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TipoBeca } from '../../tipobeca/entities/tipobeca.entity'; // Asegura la ruta correcta

@Entity('beca_requisito') // Mapea a la tabla 'beca_requisito' en tu base de datos
export class Requisito {
  @PrimaryGeneratedColumn() // Columna de ID autoincremental y clave primaria
  Id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true }) // ¡COLUMNA NOMBRE AQUI!
  Nombre: string; // Esta es la columna que falta o está mal en tu DB

  @Column({ type: 'text', nullable: true })
  Descripcion: string;

  @ManyToOne(() => TipoBeca, (tipoBeca) => tipoBeca.requisitos)
  @JoinColumn({ name: 'TipoBecaId' })
  tipoBeca: TipoBeca;

  @Column({ name: 'TipoBecaId', type: 'int', nullable: false })
  TipoBecaId: number;
}
