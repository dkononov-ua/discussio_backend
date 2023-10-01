/* eslint-disable prettier/prettier */
import { Controller, Post, Response, Body } from '@nestjs/common';
import { AcceptSubsService } from './acceptsubs.service';

@Controller('acceptsubs')
export class AcceptSubsController {
    constructor(private readonly acceptSubsService: AcceptSubsService) {}


    @Post('add/sitizen')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async acceptSubscribes(@Response() res, @Body() tok: Object): Promise<any> {
      await this.acceptSubsService.acceptSubscribes(tok, res);
    }

    @Post('delete/subs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async deleteSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.acceptSubsService.deleteSubs(tok, res);
    }

    @Post('delete/ysubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async deleteYSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.acceptSubsService.deleteYSubs(tok, res);
    }

    @Post('get/subs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.acceptSubsService.getAccepSubs(tok, res);
    }

    @Post('get/ysubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getYSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.acceptSubsService.getAccepYSubs(tok, res);
    }


    @Post('get/CountSubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getCountSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.acceptSubsService.getCountSubs(tok, res);
    }

    @Post('get/CountYsubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getCountYsubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.acceptSubsService.getCountYsubs(tok, res);
    }

}
