/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  setupSwagger(app);
  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
