/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthExceptionFilter } from './auth/jwt/jwt-auth-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Carga las variables de entorno desde el archivo .env
const envFilePath = path.resolve(__dirname, '..', '.env');
const envFileExists = fs.existsSync(envFilePath);
if (envFileExists) {
  dotenv.config({ path: envFilePath });
} else {
  console.error('.env file not found, using default environment variables.');
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    BooksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: JwtAuthExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
