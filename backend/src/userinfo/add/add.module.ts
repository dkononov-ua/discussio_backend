import { Module } from '@nestjs/common';
import { AddService } from './add.service';
import { AddController } from './add.controller';
import { AppService } from 'src/app.service';

@Module({
  providers: [AddService, AppService],
  controllers: [AddController]
})
export class AddModule {}
