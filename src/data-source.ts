import { DataSource } from 'typeorm';
import { TipoBeca } from './tipobeca/entities/tipobeca.entity';
import { Beca } from './beca/entities/beca.entity';
import { Requisito } from './requisito/entities/requisito.entity';
import { SolicitudBeca } from './beca_solicitudbeca/entities/solicitudbeca.entity';

export default new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'flash',
  database: 'bdbeca',
  synchronize: false,
  logging: true,
  entities: [TipoBeca, Beca, Requisito, SolicitudBeca],
  migrations: ['src/migration/*.ts'],
});