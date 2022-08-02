import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  mongoose.connect('mongodb://localhost/sync-todo');
  const db = mongoose.connection;
  db.on('error', (e) => console.log(e));
  db.once('open', () => console.log('Conecting DB'));

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
