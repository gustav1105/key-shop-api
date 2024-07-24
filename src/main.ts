import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Enable global validation if needed for HTTP calls made from this client
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Only connect to the server here if you are intending to have a running HTTP server for other purposes like API requests
  await app.listen(3001);
}
bootstrap();
