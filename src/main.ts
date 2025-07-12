// En tu main.ts de NestJS (o donde inicialices tu app)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // Permite solo tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si usas cookies o autenticación basada en sesión
  });
  await app.listen(3000);
}
bootstrap();