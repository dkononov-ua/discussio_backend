/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from "src/db";
import { AppService } from "src/app.service";

@Injectable()
export class ChatService {
  constructor(private readonly appService: AppService) {}

    async addChatFlat(tok: any, res: any): Promise<any> {
        const a = await this.appService.authentification(tok.auth);
        const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
        const admin = await this.appService.citizen(a.user_id, tok.flat_id);
        const dissc = await this.appService.getAgentFLS(tok.user_id);
        if (a && fl && dissc && await this.appService.getChat(fl.flat_id, tok.user_id) === false) { 
            res.status(200).json({ status: await this.appService.addChat(fl.flat_id, tok.user_id) });
        } else if (a && admin.acces_flat_chats === 1 && dissc && await this.appService.getChat(admin.flat_id, tok.user_id) === false) {
            res.status(200).json({ status: await this.appService.addChat(admin.flat_id, tok.user_id) });
        } else {
          res.status(200).json({ status: false });
        }
      }

      async addChatUser(tok: any, res: any): Promise<any> {
        //  Перевірити
        const a = await this.appService.authentification(tok.auth);
        const chat = await this.appService.getChat(tok.flat_id, a.user_id)
        if (a && chat === false) {
          res.status(200).json({ status: await this.appService.addChat(tok.flat_id, a.user_id) });
        } else {
          res.status(200).json({ status: false });
        }
      }


    
      async sendMessageFlat(tok: any, res: any): Promise<any> {
        const a = await this.appService.authentification(tok.auth);
        const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
        const admin = await this.appService.citizen(a.user_id, tok.flat_id);
        const dissc = await this.appService.getAgentFLS(tok.user_id);
        const chat = await this.appService.getChat(tok.flat_id, tok.user_id)
        if (a && fl && dissc && chat) {
          await this.appService.readMessageFlat(chat.user_id, chat.chat_id)
            res.status(200).json({ status: await this.appService.sendMessageFlat(a.user_id, fl.flat_id, chat.chat_id, tok.message) });
        } else if (a && admin.acces_flat_chats === 1 && dissc && chat) {
          await this.appService.readMessageFlat(chat.user_id, chat.chat_id)
            res.status(200).json({ status: await this.appService.sendMessageFlat(a.user_id, admin.flat_id, chat.chat_id, tok.message) });
        } else {
          res.status(200).json({ status: false });
        }
      }

      async sendMessageUser(tok: any, res: any): Promise<any> {
        const a = await this.appService.authentification(tok.auth);
        const chat = await this.appService.getChat(tok.flat_id, a.user_id)
        if (a && chat) {
            await this.appService.readMessageUser(chat.flat_id, chat.chat_id)
            res.status(200).json({ status: await this.appService.sendMessageUser(a.user_id, chat.chat_id, tok.message) });
        } else {
          res.status(200).json({ status: false });
        }
      }
    
    async getmessageFlat(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
      const admin = await this.appService.citizen(a.user_id, tok.flat_id);
      const chat = await this.appService.getChat(tok.flat_id, tok.user_id)
      if (a && fl && chat) {
        res.status(200).json({ status: await this.appService.getmessage(chat.chat_id, tok.offs) });
      } else if (a && admin.acces_flat_chats === 1 && chat) {
        res.status(200).json({ status: await this.appService.getmessage(chat.chat_id, tok.offs) });
      } else {
        res.status(200).json({ status: false });
      }
    }

    async getmessageUser(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      const chat = await this.appService.getChat(tok.flat_id, a.user_id)
      if (a && chat) {
        res.status(200).json({ status: await this.appService.getmessage(chat.chat_id, tok.offs) });
      } else {
        res.status(200).json({ status: false });
      }
    }


    async getChatsUser(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      if (a) {
        res.status(200).json({ status: await this.appService.getChatsUser(a.user_id, tok.offs) });
      } else {
        res.status(200).json({ status: false });
      }
    }

    async getChatsFlat(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
      const admin = await this.appService.citizen(a.user_id, tok.flat_id);

      if (a && fl) {
        res.status(200).json({ status: await this.appService.getChatsFlat(fl.flat_id, tok.offs) });
      } else if (a && admin.acces_flat_chats === 1) {
        res.status(200).json({ status: await this.appService.getChatsFlat(admin.flat_id, tok.offs) });
      } else {
        res.status(200).json({ status: false });
      }
    }


    async readMessageFlat(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
      const admin = await this.appService.citizen(a.user_id, tok.flat_id);
      const dissc = await this.appService.getAgentFLS(tok.user_id);
      const chat = await this.appService.getChat(tok.flat_id, tok.user_id)
      if (a && fl && dissc && chat) {
          res.status(200).json({ status: await this.appService.readMessageFlat(chat.user_id, chat.chat_id) });
      } else if (a && admin.acces_flat_chats === 1 && dissc && chat) {
          res.status(200).json({ status: await this.appService.readMessageFlat(chat.user_id, chat.chat_id) });
      } else {
        res.status(200).json({ status: false });
      }
    }

    async readMessageUser(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      const chat = await this.appService.getChat(tok.flat_id, a.user_id)
      if (a && chat) {
          res.status(200).json({ status: await this.appService.readMessageUser(chat.flat_id, chat.chat_id) });
      } else {
        res.status(200).json({ status: false });
      }
    }


    async getNewMessageFlat(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
      const admin = await this.appService.citizen(a.user_id, tok.flat_id);
      const dissc = await this.appService.getAgentFLS(tok.user_id);
      const chat = await this.appService.getChat(tok.flat_id, tok.user_id)
      if (a && fl && dissc && chat) {
          res.status(200).json({ status: await this.appService.getNewmessage(chat.chat_id, tok.data, tok.offs) });
      } else if (a && admin.acces_flat_chats === 1 && dissc && chat) {
          res.status(200).json({ status: await this.appService.getNewmessage(chat.chat_id, tok.data, tok.offs) });
      } else {
        res.status(200).json({ status: false });
      }
    }

    async getNewMessageUser(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      const chat = await this.appService.getChat(tok.flat_id, a.user_id)
      if (a && chat) {
          res.status(200).json({ status: await this.appService.getNewmessage(chat.chat_id, tok.data, tok.offs) });
      } else {
        res.status(200).json({ status: false });
      }
    }

    async getDontReadMessageFlat(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
      const admin = await this.appService.citizen(a.user_id, tok.flat_id);
      if (a && fl) {
          res.status(200).json({ status: await this.appService.dontReadMessageFlat(fl.flat_id) });
      } else if (a && admin.acces_flat_chats === 1) {
          res.status(200).json({ status: await this.appService.dontReadMessageFlat(admin.flat_id) });
      } else {
        res.status(200).json({ status: false });
      }
    }

    async getDontReadMessageUser(tok: any, res: any): Promise<any> {
      const a = await this.appService.authentification(tok.auth);
      if (a ) {
          res.status(200).json({ status: await this.appService.dontReadMessageUser(a.user_id) });
      } else {
        res.status(200).json({ status: false });
      }
    }

}
