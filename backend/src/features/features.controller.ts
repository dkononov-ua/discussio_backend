import { Controller, Post, Response, Body } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
    constructor(private readonly featuresService: FeaturesService) {}

    @Post('add')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async addFeatures(@Response() res, @Body() tok: Object): Promise<any> {
      await this.featuresService.addFeatures(tok, res);
    }


    @Post('get')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getFeatures(@Response() res, @Body() tok: Object): Promise<any> {
      await this.featuresService.getFeatures(tok, res);
    }




}
