import { Injectable } from '@nestjs/common';
import { commandProps } from './app.interface';
import Task from './task.model';

@Injectable()
export class AppService {
  async runCommands(command: commandProps): Promise<any> {
    switch (command.type) {
      case 'get_task':
        return { ok: true, tasks: await Task.find({}) };
        break;

      case 'create_task':
        const newTask = new Task({
          title: command.data.title,
        });
        try {
          const createdTask = await newTask.save();
          return { ok: true, task: createdTask };
        } catch (err) {
          return { ok: false };
        }
        break;

      case 'delete_task':
        try {
          await Task.findByIdAndRemove(command.data.id);
          return { ok: true, id: command.data.id };
        } catch (err) {
          return { ok: false };
        }
        break;

      case 'update_task':
        try {
          const task = await Task.findById(command.data.id);
          if (command.data.title) {
            task.title = command.data.title;
          }
          const updatedTask = await task.save();
          return { ok: true, updated_task: updatedTask };
        } catch (err) {
          return { ok: false };
        }
        break;

      case 'completed_task':
        try {
          const task = await Task.findById(command.data.id);

          task.completed = !task.completed;

          const updatedTask = await task.save();
          return { ok: true, updated_task: updatedTask };
        } catch (err) {
          return { ok: false };
        }
        break;

      default:
        return { ok: false };
    }
  }
}
