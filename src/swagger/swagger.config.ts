/* eslint-disable prettier/prettier */
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

// Función para configurar Swagger en una aplicación NestJS.
export function setupSwagger(app: INestApplication): void {
  // Configura el generador de documentos Swagger.
  const config = new DocumentBuilder()
    .setTitle('Biblioteca API')  // Título de la documentación Swagger.
    .setDescription('API para la gestión de libros en una biblioteca')  // Descripción de la API.
    .setVersion('1.0')  // Versión de la API.
    .addBearerAuth()  // Agrega soporte para autenticación Bearer (JWT u otro token).
    .build();  // Construye la configuración del documento Swagger.

  // Crea el documento Swagger.
  const document = SwaggerModule.createDocument(app, config);

  // Configura Swagger en la ruta '/api' de la aplicación.
  SwaggerModule.setup('api/swagger', app, document);
}
