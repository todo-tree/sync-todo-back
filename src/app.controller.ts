import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { createProps, updateProps } from './app.interface';
import { AppService } from './app.service';

@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTask(): Promise<any> {
    return await this.appService.getTask();
  }

  @Post()
  async createTask(@Body('data') data: createProps): Promise<any> {
    return await this.appService.createTask(data);
  }

  @Post(':id')
  async completeTask(@Param() params): Promise<any> {
    return await this.appService.completeTask(params.id);
  }

  @Patch(':id')
  async updateTask(
    @Param() params,
    @Body('data') data: updateProps,
  ): Promise<any> {
    return await this.appService.updateTask(params.id, data);
  }

  @Delete(':id')
  async deleteTask(@Param() params): Promise<any> {
    return await this.appService.deleteTask(params.id);
  }
}
