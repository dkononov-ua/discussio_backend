import { Module } from '@nestjs/common';
import { ComunalController } from './comunal.controller';
import { ComunalService } from './comunal.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ComunalController],
  providers: [ComunalService, AppService]
})
export class ComunalModule {}
