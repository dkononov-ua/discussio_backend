import { Module } from '@nestjs/common';
import { SubsController } from './subs.controller';
import { SubsService } from './subs.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [SubsController],
  providers: [SubsService, AppService]
})
export class SubsModule {}
