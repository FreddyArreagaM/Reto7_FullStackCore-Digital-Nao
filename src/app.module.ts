/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthExceptionFilter } from './auth/jwt/jwt-auth-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    //Declaración de variables para conexión con MySQL
    TypeOrmModule.forRoot(
      {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin12345@@',
      database: 'books_db',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      }),
    BooksModule,
    AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: JwtAuthExceptionFilter,
    },
    AppService
  ],
})
export class AppModule {}
