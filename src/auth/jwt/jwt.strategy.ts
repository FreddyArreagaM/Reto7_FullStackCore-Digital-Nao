/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Decorador @Injectable para hacer que JwtStrategy sea un servicio inyectable
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor() {
    // Llama al constructor de PassportStrategy con la configuración de Strategy
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token JWT del encabezado de autorización Bearer
      ignoreExpiration: false, // Indica si se debe ignorar la expiración del token JWT
      secretOrKey: '8*I5|f8W_+bti,dV(/602j8', // Clave secreta para verificar la firma del token JWT
    });
  }

  // Método async validate() que valida y procesa el payload del token JWT
  async validate(payload: any) {
    // Retorna un objeto con la información del usuario extraída del payload del token JWT
    return { userId: payload.sub, username: payload.username };
  }
}

