import { Injectable } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import Task from './task.model';
import { createProps, updateProps } from './app.interface';

@Injectable()
export class AppService {
  constructor(private readonly appGateway: AppGateway) {}

  async getTask(): Promise<any> {
    return { ok: true, tasks: await Task.find({}) };
  }

  async createTask(data: createProps): Promise<any> {
    const newTask = new Task({
      title: data.title,
    });
    try {
      const createdTask = await newTask.save();
      this.appGateway.server.emit('create_task', createdTask);
      return { ok: true, task: createdTask };
    } catch (err) {
      return { ok: false };
    }
  }

  async deleteTask(id: string): Promise<any> {
    try {
      await Task.findByIdAndRemove(id);
      this.appGateway.server.emit('delete_task', id);
      return { ok: true };
    } catch (err) {
      return { ok: false };
    }
  }

  async updateTask(id: string, data: updateProps): Promise<any> {
    try {
      const task = await Task.findById(id);
      if (data.title) {
        task.title = data.title;
      }
      const updatedTask = await task.save();

      this.appGateway.server.emit('updated_task', updatedTask);

      return { ok: true, updated_task: updatedTask };
    } catch (err) {
      return { ok: false };
    }
  }

  async completeTask(id: string): Promise<any> {
    try {
      const task = await Task.findById(id);

      task.completed = !task.completed;

      const updatedTask = await task.save();

      this.appGateway.server.emit('updated_task', updatedTask);

      return { ok: true, updated_task: updatedTask };
    } catch (err) {
      return { ok: false };
    }
  }
}
