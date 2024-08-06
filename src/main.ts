import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvConfig } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Transforma queries a número implicitamente.
      },
      whitelist: true, // Elimina los atributos que no hacen parte de la clase.
      forbidNonWhitelisted: true, // Genera un error si recibe un atributo que no hace parte de la clase
    }
  ))
  app.enableCors(); // Permite CORS Policy.
  await app.listen(+EnvConfig().port);
}
bootstrap();
