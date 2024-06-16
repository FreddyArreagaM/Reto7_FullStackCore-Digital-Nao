/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //EndPoint de prueba para testear el API
  @Get()
  @ApiOperation({ summary: 'Testeo conexion API ' })
  test(): string {
    return this.appService.test();
  }
}
