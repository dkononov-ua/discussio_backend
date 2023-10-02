/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from 'fs'


async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./etc/letsencrypt/live/sky.syrykh.com:8000/privkey.pem'),
    cert: fs.readFileSync('./etc/letsencrypt/live/sky.syrykh.com:8000/cert.pem'),
  };
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
