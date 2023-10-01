/* eslint-disable prettier/prettier */
import { Controller, Post, Response, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';


@Controller('feedback')
export class FeedbackController {
    constructor(private readonly FeedbackService: FeedbackService) {}

    @Post('add')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async addFeedback(@Response() res, @Body() tok: Object): Promise<any> {
      await this.FeedbackService.addFeedback(tok, res);
    }


    @Post('get/user')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getUserFeedback(@Response() res, @Body() tok: Object): Promise<any> {
      await this.FeedbackService.getUserFeedback(tok, res);
    }

    @Post('get/admin')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getAdminFeedback(@Response() res, @Body() tok: Object): Promise<any> {
      await this.FeedbackService.getAdminFeedback(tok, res);
    }


}