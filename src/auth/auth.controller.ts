/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Endpoint para iniciar sesion de forma statica con un user y password
  @Post('login')
  async login(@Body() req: any) {
    const user = { userId: 1, username: req.username };
    return this.authService.login(user);
  }
}
