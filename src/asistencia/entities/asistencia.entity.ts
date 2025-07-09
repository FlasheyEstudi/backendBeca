// src/asistencia/entities/asistencia.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// No necesitamos importar forwardRef aquí para este uso en el decorador de TypeORM.
// import { forwardRef } from '@nestjs/common';
import { Estudiante } from '../../estudiante/entities/estudiante.entity'; // Asegura que esta ruta sea correcta
import { Asignatura } from '../../asignatura/entities/asignatura.entity'; // Asegura que esta ruta sea correcta
import { PeriodoAcademico } from '../../periodoacademico/entities/periodoacademico.entity'; // Asegura que esta ruta sea correcta

@Entity('beca_asistencia') // Asegúrate de que el nombre de la tabla en la DB sea 'beca_asistencia'
export class Asistencia { // ¡ASEGÚRATE DE QUE 'export' ESTÉ AQUÍ!
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'date' }) // El tipo 'date' en TypeORM se mapea a DATE en MySQL
  Fecha: Date;

  @Column({ type: 'boolean' }) // tinyint(1) en MySQL se mapea a boolean en TypeORM
  Asistio: boolean;

  // Mapeo para PeriodoAcademicoId (columna NOT NULL en DB)
  @Column({ name: 'PeriodoAcademicoId', type: 'int', nullable: false })
  PeriodoAcademicoId: number;

  // Mapeo para Fecha_Registro (columna con guion bajo en DB)
  @Column({ name: 'Fecha_Registro', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Fecha_Registro: Date;

  // --- Definición de relaciones ManyToOne y sus claves foráneas explícitas ---

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.asistencias) // Asegúrate de que 'asistencias' sea la propiedad inversa en Estudiante
  @JoinColumn({ name: 'EstudianteId' }) // Esto define la columna de clave foránea
  estudiante: Estudiante;

  @Column({ name: 'EstudianteId', type: 'int', nullable: false }) // Columna explícita para la clave foránea
  EstudianteId: number;

  @ManyToOne(() => Asignatura, (asignatura) => asignatura.asistencias) // Asegúrate de que 'asistencias' sea la propiedad inversa en Asignatura
  @JoinColumn({ name: 'AsignaturaId' }) // Esto define la columna de clave foránea
  asignatura: Asignatura;

  @Column({ name: 'AsignaturaId', type: 'int', nullable: false }) // Columna explícita para la clave foránea
  AsignaturaId: number;

  // --- Relación ManyToOne con PeriodoAcademico (¡CORREGIDO: Sin forwardRef en el primer argumento!) ---
  @ManyToOne(() => PeriodoAcademico, (periodoAcademico) => periodoAcademico.asistencias) // El primer argumento es una función que devuelve directamente la clase PeriodoAcademico
  @JoinColumn({ name: 'PeriodoAcademicoId' }) // Esto define la columna de clave foránea
  periodoAcademico: PeriodoAcademico; // Propiedad para la relación
}
