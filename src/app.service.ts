/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  //Metod de prueba para testear el API
  test(): string {
    return 'Welcome to NestJs';
  }
}
