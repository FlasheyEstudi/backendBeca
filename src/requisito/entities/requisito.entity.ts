import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TipoBeca } from '../../tipobeca/entities/tipobeca.entity';

@Entity('beca_requisito')
export class Requisito {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;

  @Column({ type: 'text', nullable: true })
  Descripcion: string;

  @ManyToOne(() => TipoBeca, (tipoBeca) => tipoBeca.requisitos)
  tipoBeca: TipoBeca;
}