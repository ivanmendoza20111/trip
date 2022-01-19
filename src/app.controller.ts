import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Aplicación funcionando!!' })
    @ApiResponse({
        status: 200,
        description:
          'Para verificar que nuestra aplicación este funcionando',
    })
  getHello(): string {
    return this.appService.getOk();
  }
}
