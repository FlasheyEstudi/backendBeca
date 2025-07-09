// src/periodoacademico/entities/periodoacademico.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// Ya no necesitamos importar forwardRef aquí si no se usa en los decoradores
import { Asistencia } from '../../asistencia/entities/asistencia.entity'; // ¡CORREGIDO: Usar 'from' en lugar de '=>'!
import { Nota } from '../../nota/entities/nota.entity'; // Asegura la ruta correcta

@Entity('beca_periodo_academico') // Mapea a la tabla 'beca_periodo_academico' en tu base de datos
export class PeriodoAcademico {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  Nombre: string; // Ej. "Primer Semestre 2025"

  @Column({ type: 'date', nullable: false })
  FechaInicio: Date;

  @Column({ type: 'date', nullable: false })
  FechaFin: Date;

  // Relación OneToMany con Asistencia (sin forwardRef en el decorador)
  @OneToMany(() => Asistencia, (asistencia) => asistencia.periodoAcademico)
  asistencias: Asistencia[];

  // Relación OneToMany con Nota (sin forwardRef en el decorador)
  @OneToMany(() => Nota, (nota) => nota.periodoAcademico)
  notas: Nota[];
}
