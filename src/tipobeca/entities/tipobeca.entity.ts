import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Requisito } from '../../requisito/entities/requisito.entity'; // Ajusta la ruta según tu estructura
import { Beca } from '../../beca/entities/beca.entity'; // Ajusta la ruta según tu estructura

@Entity('beca_tipo_beca')
export class TipoBeca {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  Nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  Descripcion: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  Monto: number;

  @OneToMany(() => Requisito, (requisito) => requisito.tipoBeca)
  requisitos: Requisito[];

  @OneToMany(() => Beca, (beca) => beca.tipoBeca)
  becas: Beca[];
}