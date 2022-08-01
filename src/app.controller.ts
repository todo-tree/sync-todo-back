import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { commandProps } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async runCommands(@Body('command') command: commandProps): Promise<any> {
    return await this.appService.runCommands(command);
  }
}
