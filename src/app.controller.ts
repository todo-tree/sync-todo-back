import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { commandProps } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body('command') command: commandProps): string {
    return this.appService.getHello(command);
  }
}
