import { Injectable } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { commandProps } from './app.interface';
import Task from './task.model';

@Injectable()
export class AppService {
  constructor(private readonly appGateway: AppGateway) {}

  async runCommands(command: commandProps): Promise<any> {
    switch (command.type) {
      case 'get_task':
        return { ok: true, tasks: await Task.find({}) };

      case 'create_task':
        const newTask = new Task({
          title: command.data.title,
        });
        try {
          const createdTask = await newTask.save();
          this.appGateway.server.emit('create_task', createdTask);
          return { ok: true, task: createdTask };
        } catch (err) {
          return { ok: false };
        }

      case 'delete_task':
        try {
          await Task.findByIdAndRemove(command.data.id);
          this.appGateway.server.emit('delete_task', command.data.id);
          return { ok: true, id: command.data.id };
        } catch (err) {
          return { ok: false };
        }

      case 'update_task':
        try {
          const task = await Task.findById(command.data.id);
          if (command.data.title) {
            task.title = command.data.title;
          }
          const updatedTask = await task.save();

          this.appGateway.server.emit('updated_task', updatedTask);

          return { ok: true, updated_task: updatedTask };
        } catch (err) {
          return { ok: false };
        }

      case 'completed_task':
        try {
          const task = await Task.findById(command.data.id);

          task.completed = !task.completed;

          const updatedTask = await task.save();

          this.appGateway.server.emit('updated_task', updatedTask);

          return { ok: true, updated_task: updatedTask };
        } catch (err) {
          return { ok: false };
        }

      default:
        return { ok: false };
    }
  }
}
