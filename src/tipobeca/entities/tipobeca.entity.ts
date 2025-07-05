import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Requisito } from '../../requisito/entities/requisito.entity';

@Entity('beca_tipobeca')
export class TipoBeca {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Nombre: string;

  @Column({ type: 'int', nullable: true })
  RequisitoId: number;

  @OneToMany(() => Requisito, (requisito) => requisito.tipoBeca)
  requisitos: Requisito[];
}