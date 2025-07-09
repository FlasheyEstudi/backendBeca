// src/beca/entities/beca.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
// No necesitamos importar forwardRef aquí para este uso en el decorador de TypeORM.
// import { forwardRef } from '@nestjs/common';
import { TipoBeca } from '../../tipobeca/entities/tipobeca.entity'; // Asegura la ruta correcta a TipoBeca
import { SolicitudBeca } from '../../beca_solicitudbeca/entities/solicitudbeca.entity'; // Asegura la ruta correcta a SolicitudBeca

@Entity('beca_beca') // Mapea a la tabla 'beca_beca' en tu base de datos
export class Beca { // ¡Asegúrate de que 'export' esté aquí!
  @PrimaryGeneratedColumn() // Columna de ID autoincremental y clave primaria
  Id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  Nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) // Monto de la beca, ej. 1000.00
  Monto: number;

  @Column({ type: 'text', nullable: true })
  Descripcion: string | null; // Descripción de la beca, puede ser nula

  // --- Relación ManyToOne con TipoBeca ---
  // Asegúrate de que TipoBeca tenga la propiedad 'becas' definida como OneToMany
  @ManyToOne(() => TipoBeca, (tipoBeca) => tipoBeca.becas)
  @JoinColumn({ name: 'TipoBecaId' }) // Clave foránea en la DB
  tipoBeca: TipoBeca;

  @Column({ name: 'TipoBecaId', type: 'int', nullable: false }) // Columna explícita para la clave foránea
  TipoBecaId: number;

  // --- Relación OneToMany con SolicitudBeca (¡CORREGIDO: Sin forwardRef en el primer argumento!) ---
  // El primer argumento es una función que devuelve directamente la clase SolicitudBeca
  // 'solicitudesBeca' es la propiedad en la entidad SolicitudBeca que apunta a esta beca
  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.beca)
  solicitudesBeca: SolicitudBeca[];
}
