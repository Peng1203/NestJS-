import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import fs from 'fs/promises';
import { normalize } from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('text')
  @Header('Content-Type', 'text/plain')
  @Public()
  async getBigText() {
    const data = await fs.readFile(
      normalize('C:\\Users\\csq\\Desktop\\node_onu_gis_google_street.json'),
    );
    data.toString();
    return data.toString();
  }
}
