import { Controller, Post, Response, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService : MailService){}

    @Post()
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getRegister(@Response() res, @Body() tok: Object): Promise<any> {
      await this.mailService.sendmailChangeCode(tok, res);
    }












}
