import { Injectable } from '@nestjs/common';
import { commandProps } from './app.interface';

@Injectable()
export class AppService {
  getHello(command: commandProps): string {
    return `Command-type: "${command.type}"`;
  }
}
