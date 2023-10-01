import { Controller, Post, Response, Body, Get } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';

@Controller('userinfo')
export class UserinfoController {
    constructor(private readonly userinfoService: UserinfoService) {}

    @Post()
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getUserinfo(@Response() res, @Body() tok: Object): Promise<any> {
      await this.userinfoService.getUserinfoService(tok, res);
    }


    @Post('agent')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getAgentinfo(@Response() res, @Body() tok: Object): Promise<any> {
      await this.userinfoService.getAgentinfo(tok, res);
    }

    @Post('public')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getUserinfoPublic(@Response() res, @Body() tok: Object): Promise<any> {
      await this.userinfoService.getUserinfoPublic(tok, res);
    }
}
