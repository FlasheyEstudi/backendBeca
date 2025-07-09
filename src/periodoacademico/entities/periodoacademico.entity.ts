// src/periodoacademico/entities/periodoacademico.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// No necesitamos importar forwardRef aquí para este uso en el decorador de TypeORM.
// import { forwardRef } from '@nestjs/common';
import { Asistencia } from '../../asistencia/entities/asistencia.entity'; // Asegura la ruta correcta
import { Nota } from '../../nota/entities/nota.entity'; // Asegura la ruta correcta

@Entity('beca_periodo_academico') // Mapea a la tabla 'beca_periodo_academico' en tu base de datos
export class PeriodoAcademico { // ¡Asegúrate de que 'export' esté aquí!
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  Nombre: string; // Ej. "Primer Semestre 2025"

  @Column({ type: 'date', nullable: false })
  FechaInicio: Date;

  @Column({ type: 'date', nullable: false })
  FechaFin: Date;

  // Relación OneToMany con Asistencia (¡CORREGIDO: Sin forwardRef en el primer argumento!)
  @OneToMany(() => Asistencia, (asistencia) => asistencia.periodoAcademico)
  asistencias: Asistencia[];

  // Relación OneToMany con Nota (¡CORREGIDO: Sin forwardRef en el primer argumento!)
  @OneToMany(() => Nota, (nota) => nota.periodoAcademico)
  notas: Nota[];
}
