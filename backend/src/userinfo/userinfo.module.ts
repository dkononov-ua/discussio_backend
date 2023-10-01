import { Module } from '@nestjs/common';
import { UserinfoController } from './userinfo.controller';
import { UserinfoService } from './userinfo.service';
import { AddModule } from './add/add.module';
import { AppService } from 'src/app.service';

@Module({
  controllers: [UserinfoController],
  providers: [UserinfoService, AppService],
  imports: [AddModule]
})
export class UserinfoModule {}
