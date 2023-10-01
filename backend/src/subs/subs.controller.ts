/* eslint-disable prettier/prettier */
import { Controller, Post, Response, Body } from '@nestjs/common';
import { SubsService } from './subs.service';

@Controller('subs')
export class SubsController {
    constructor(private readonly subsService: SubsService) {}
    // юзер, підписався на оселю
    @Post('subscribe')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async subscribe(@Response() res, @Body() tok: Object): Promise<any> {
      await this.subsService.subscribe(tok, res);
    }


    @Post('checkSubscribe')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async checkSubscribe(@Response() res, @Body() tok: Object): Promise<any> {
      await this.subsService.checkSubscribe(tok, res);
    }
    // оселя, ухвалення підписника
    @Post('accept')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async acceptSubscribes(@Response() res, @Body() tok: Object): Promise<any> {
      await this.subsService.acceptSubscribes(tok, res);
    }
    // оселя, видалення підписника по 1 
    @Post('delete/subs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async deleteSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.subsService.deleteSubs(tok, res);
    }
    // юзер, відписка від оселі 
    @Post('delete/ysubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async deleteYSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.subsService.deleteYSubs(tok, res);
    }

    // оселя, отримую підписників 
    @Post('get/subs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.subsService.getSubs(tok, res);
    }
    // юзер, отримую підписки на оселі які підписався
    @Post('get/ysubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getYSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.subsService.getYSubs(tok, res);
    }

    @Post('get/countSubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getCountSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.subsService.getCountSubs(tok, res);
    }
  
    @Post('get/countYSubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getCountYSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.subsService.getCountYSubs(tok, res);
    }


}
