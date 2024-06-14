/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

// El decorador @Catch indica que este filtro maneja la excepción UnauthorizedException
@Catch(UnauthorizedException)
export class JwtAuthExceptionFilter implements ExceptionFilter {
  
  // La función catch() es obligatoria para implementar ExceptionFilter
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    // ArgumentsHost permite acceder al contexto de la solicitud
    const ctx = host.switchToHttp();
    
    // Obtener la respuesta y la solicitud del contexto HTTP
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    // Configurar la respuesta con un estado de 401 (Unauthorized)
    response.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized',
    });
  }
}
