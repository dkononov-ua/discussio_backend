import { Controller, Post, Response, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post("add/chatFlat")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async addChatFlat(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.addChatFlat(tok, res);
    }

    @Post("add/chatUser")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async addChatUser(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.addChatUser(tok, res);
    }
  
    @Post("sendMessageFlat")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async sendMessageFlat(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.sendMessageFlat(tok, res);
    }

    @Post("sendMessageUser")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async sendMessageUser(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.sendMessageUser(tok, res);
    }

    @Post("get/userchats")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getChatsUser(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.getChatsUser(tok, res);
    }

    @Post("get/flatchats")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getChatsFlat(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.getChatsFlat(tok, res);
    }

    @Post("get/usermessage")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getmessageUser(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.getmessageUser(tok, res);
    }

    @Post("get/flatmessage")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getmessageFlat(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.getmessageFlat(tok, res);
    }
  






    @Post("readMessageFlat")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async readMessageFlat(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.readMessageFlat(tok, res);
    }

    @Post("readMessageUser")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async readMessageUser(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.readMessageUser(tok, res);
    }

    @Post("get/NewMessageFlat")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getNewMessageFlat(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.getNewMessageFlat(tok, res);
    }

    @Post("get/NewMessageUser")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getNewMessageUser(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.getNewMessageUser(tok, res);
    }

    @Post("get/DontReadMessageFlat")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getDontReadMessageFlat(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.getDontReadMessageFlat(tok, res);
    }


    @Post("get/DontReadMessageUser")
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getDontReadMessageUser(@Response() res, @Body() tok: Object): Promise<any> {
      await this.chatService.getDontReadMessageUser(tok, res);
    }
  
}
