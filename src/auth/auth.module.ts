/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './auth.service'; 
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule, // Importa PassportModule para la integración con Passport.js
    JwtModule.register({
      secret: '8*I5|f8W_+bti,dV(/602j8', // Define la clave secreta para la firma y verificación de JWT
      signOptions: { expiresIn: '180m' }, // Define las opciones de firma del JWT, con expiración de 180 minutos
    }),
  ],
  providers: [AuthService, JwtStrategy], // Define los servicios que el módulo proporciona (AuthService y JwtStrategy)
  controllers: [AuthController], // Define los controladores que el módulo proporciona (AuthController)
  exports: [JwtModule], // Exporta JwtModule para que otros módulos puedan acceder a las funcionalidades de JWT
})
export class AuthModule {}
