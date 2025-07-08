import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:4200', // Puerto del frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  await app.listen(4200); // Puerto ajustado a 4200
  console.log(`Application is running on: ${await app.getUrl()}`); // Añadido log para confirmar el puerto
}
bootstrap();
