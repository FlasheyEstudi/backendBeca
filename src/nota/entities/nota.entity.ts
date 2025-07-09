// src/nota/entities/nota.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// No necesitamos importar forwardRef aquí para este uso en el decorador de TypeORM.
// import { forwardRef } from '@nestjs/common';
import { Estudiante } from '../../estudiante/entities/estudiante.entity'; // Asegura la ruta correcta
import { Asignatura } from '../../asignatura/entities/asignatura.entity'; // ¡RUTA Y SINTAXIS CORREGIDAS!
import { PeriodoAcademico } from '../../periodoacademico/entities/periodoacademico.entity'; // Asegura la ruta correcta

@Entity('beca_nota') // Mapea a la tabla 'beca_nota' en tu base de datos
export class Nota { // ¡Asegúrate de que 'export' esté aquí!
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false }) // Ejemplo de decimal para calificaciones
  Calificacion: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Fecha y hora de registro, con default
  FechaRegistro: Date;

  // --- Relación ManyToOne con Estudiante ---
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.notas)
  @JoinColumn({ name: 'EstudianteId' })
  estudiante: Estudiante;

  @Column({ name: 'EstudianteId', type: 'int', nullable: false })
  EstudianteId: number;

  // --- Relación ManyToOne con Asignatura (¡CORREGIDO: Sin forwardRef en el primer argumento!) ---
  @ManyToOne(() => Asignatura, (asignatura) => asignatura.notas) // El primer argumento es una función que devuelve directamente la clase Asignatura
  @JoinColumn({ name: 'AsignaturaId' })
  asignatura: Asignatura;

  @Column({ name: 'AsignaturaId', type: 'int', nullable: false })
  AsignaturaId: number;

  // --- Relación ManyToOne con PeriodoAcademico (¡CORREGIDO: Sin forwardRef en el primer argumento!) ---
  @ManyToOne(() => PeriodoAcademico, (periodoAcademico) => periodoAcademico.notas) // El primer argumento es una función que devuelve directamente la clase PeriodoAcademico
  @JoinColumn({ name: 'PeriodoAcademicoId' }) // Clave foránea en la DB
  periodoAcademico: PeriodoAcademico; // ¡Esta es la propiedad que faltaba o estaba mal!

  @Column({ name: 'PeriodoAcademicoId', type: 'int', nullable: false }) // Columna explícita para la clave foránea
  PeriodoAcademicoId: number;
}
