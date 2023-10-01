/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, AppService]
})
export class FeedbackModule {}
