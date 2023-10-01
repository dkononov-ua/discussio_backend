import { Module } from '@nestjs/common';
import { UsersubsController } from './usersubs.controller';
import { UsersubsService } from './usersubs.service';
import { AppService } from 'src/app.service';


@Module({
  controllers: [UsersubsController],
  providers: [UsersubsService, AppService]
})
export class UsersubsModule {}
