// src/nota/entities/nota.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// Ya no necesitamos importar forwardRef aquí si no se usa en los decoradores
import { Estudiante } from '../../estudiante/entities/estudiante.entity'; // Asegura la ruta correcta
import { Asignatura } from '../../asignatura/entities/asignatura.entity'; // ¡CORREGIDO: Usar 'from' en lugar de '=>'!
import { PeriodoAcademico } from '../../periodoacademico/entities/periodoacademico.entity'; // Asegura la ruta correcta

@Entity('beca_nota') // Mapea a la tabla 'beca_nota' en tu base de datos
export class Nota {
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

  // --- Relación ManyToOne con Asignatura ---
  @ManyToOne(() => Asignatura, (asignatura) => asignatura.notas)
  @JoinColumn({ name: 'AsignaturaId' })
  asignatura: Asignatura;

  @Column({ name: 'AsignaturaId', type: 'int', nullable: false })
  AsignaturaId: number;

  // --- Relación ManyToOne con PeriodoAcademico (sin forwardRef aquí) ---
  @ManyToOne(() => PeriodoAcademico, (periodoAcademico) => periodoAcademico.notas) // Referencia directa a la clase
  @JoinColumn({ name: 'PeriodoAcademicoId' }) // Clave foránea en la DB
  periodoAcademico: PeriodoAcademico; // ¡Esta es la propiedad que faltaba o estaba mal!

  @Column({ name: 'PeriodoAcademicoId', type: 'int', nullable: false }) // Columna explícita para la clave foránea
  PeriodoAcademicoId: number;
}
