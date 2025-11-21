import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'https://d694dafdba08.ngrok-free.app '],
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
  console.log(`Server running on http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
