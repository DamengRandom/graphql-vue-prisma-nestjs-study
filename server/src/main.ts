import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT ?? 3431;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Your Vue.js dev server
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  console.log(`Server started, and listening for http://localhost:${port}`);
}

bootstrap();
