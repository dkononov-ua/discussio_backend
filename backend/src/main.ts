/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs'

const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key'),
  cert: fs.readFileSync('./secrets/cert.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {httpsOptions});
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600,
  });
  await app.listen(3000);
}
bootstrap();
