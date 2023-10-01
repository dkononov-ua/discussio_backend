import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AppService } from "src/app.service";

@Module({
  controllers: [ChatController],
  providers: [ChatService, AppService]
})
export class ChatModule {}
