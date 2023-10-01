/* eslint-disable prettier/prettier */
import { Controller, Post, Response, Body } from '@nestjs/common';
import { AddService } from './add.service';


@Controller('add')
export class AddController {
    constructor(private readonly AddService: AddService) {}

    @Post('user')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getUserinfoService(@Response() res, @Body() tok: Object): Promise<any> {
      await this.AddService.getUserinfoServiceAdd(tok, res);
    }


    @Post('contacts')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getUsercontactsService(@Response() res, @Body() tok: Object): Promise<any> {
      await this.AddService.getUsercontactsServiceAdd(tok, res);
    }

    @Post('params')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async addUserParams(@Response() res, @Body() tok: Object): Promise<any> {
      await this.AddService.addUserParams(tok, res);
    }
}
