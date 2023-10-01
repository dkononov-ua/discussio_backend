import { Controller, Response, Post, Body } from '@nestjs/common';
import { UsersubsService } from './usersubs.service';

@Controller('usersubs')
export class UsersubsController {
    constructor(private readonly UsersubsService: UsersubsService) {}

        @Post('subscribe')
        // eslint-disable-next-line @typescript-eslint/ban-types
        async subscribe(@Response() res, @Body() tok: Object): Promise<any> {
          await this.UsersubsService.subscribe(tok, res);
        }
    
    
        @Post('checkSubscribe')
        // eslint-disable-next-line @typescript-eslint/ban-types
        async checkSubscribe(@Response() res, @Body() tok: Object): Promise<any> {
          await this.UsersubsService.checkSubscribe(tok, res);
        }

        @Post('accept')
        // eslint-disable-next-line @typescript-eslint/ban-types
        async acceptSubscribes(@Response() res, @Body() tok: Object): Promise<any> {
          await this.UsersubsService.acceptSubscribes(tok, res);
        }

        @Post('delete/subs')
        // eslint-disable-next-line @typescript-eslint/ban-types
        async deleteSubs(@Response() res, @Body() tok: Object): Promise<any> {
          await this.UsersubsService.deleteSubs(tok, res);
        }

        @Post('delete/ysubs')
        // eslint-disable-next-line @typescript-eslint/ban-types
        async deleteYSubs(@Response() res, @Body() tok: Object): Promise<any> {
          await this.UsersubsService.deleteYSubs(tok, res);
        }
    

        @Post('get/subs')
        // eslint-disable-next-line @typescript-eslint/ban-types
        async getSubs(@Response() res, @Body() tok: Object): Promise<any> {
          await this.UsersubsService.getSubs(tok, res);
        }

        @Post('get/ysubs')
        // eslint-disable-next-line @typescript-eslint/ban-types
        async getYSubs(@Response() res, @Body() tok: Object): Promise<any> {
          await this.UsersubsService.getYSubs(tok, res);
        }
    

    @Post('get/CountUserSubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async CountUserSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.UsersubsService.CountUserSubs(tok, res);
    }
  
    @Post('get/CountYUserSubs')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async CountYUserSubs(@Response() res, @Body() tok: Object): Promise<any> {
      await this.UsersubsService.CountYUserSubs(tok, res);
    }

}
