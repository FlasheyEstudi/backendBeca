// src/tipobeca/entities/tipobeca.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Requisito } from '../../requisito/entities/requisito.entity'; // Asegura la ruta correcta a la entidad Requisito
import { Beca } from '../../beca/entities/beca.entity'; // Importa la entidad Beca

@Entity('beca_tipo_beca') // Mapea a la tabla 'beca_tipo_beca' en tu base de datos
export class TipoBeca { // ¡Asegúrate de que 'export' esté presente aquí!
  @PrimaryGeneratedColumn() // Columna de ID autoincremental y clave primaria
  Id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true }) // Nombre del tipo de beca (único)
  Nombre: string;

  // Relación OneToMany con Requisito (un tipo de beca puede tener muchos requisitos)
  // 'tipoBeca' es la propiedad en la entidad Requisito que apunta a este tipo de beca
  @OneToMany(() => Requisito, (requisito) => requisito.tipoBeca)
  requisitos: Requisito[];

  // --- RELACIÓN CRUCIAL: OneToMany con Beca ---
  // 'tipoBeca' es la propiedad en la entidad Beca que apunta a este tipo de beca
  @OneToMany(() => Beca, (beca) => beca.tipoBeca)
  becas: Beca[]; // ¡Esta propiedad 'becas' es necesaria para la relación inversa!
  // --- FIN RELACIÓN ---
}
