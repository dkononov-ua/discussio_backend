import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService, AppService]
})
export class FeaturesModule {}
