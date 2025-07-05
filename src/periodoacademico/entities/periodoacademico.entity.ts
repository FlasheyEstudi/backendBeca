import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('beca_periodoacademico')
export class PeriodoAcademico {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  Nombre: string;

  @Column({ type: 'date', nullable: false })
  FechaInicio: Date;

  @Column({ type: 'date', nullable: false })
  FechaFin: Date;
}