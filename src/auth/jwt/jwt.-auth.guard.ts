/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Decorador @Injectable para hacer que JwtAuthGuard sea un servicio inyectable
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  
  // Método canActivate() que debe ser implementado según la interfaz de AuthGuard
  canActivate(context: ExecutionContext) {
    // Llama al método canActivate() de la clase padre (AuthGuard) para realizar la autenticación
    return super.canActivate(context);
  }

  // Método handleRequest() que maneja la respuesta después de la autenticación
  handleRequest(err, user, info) {
    // Si hay un error o el usuario no está autenticado, se lanza UnauthorizedException
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    // Si la autenticación fue exitosa, se devuelve el usuario autenticado
    return user;
  }
}

