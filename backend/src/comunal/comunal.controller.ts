import { Controller, Post, Response, Body } from '@nestjs/common';
import { ComunalService } from './comunal.service';

@Controller('comunal')
export class ComunalController {
  constructor(private readonly ComunalService: ComunalService) {}


  @Post('add/comunal')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async addComunal(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.addComunal(tok, res);
  }

  @Post('add/comunalCompany')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async addComunalCompany(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.addComunalCompany(tok, res);
  }

  @Post('add/button')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async addComunalbutton(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.addComunalbutton(tok, res);
  }

  @Post('change')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async changeComunal(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.changeComunal(tok, res);
  }

  @Post('get/comunal')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getComunal(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.getComunal(tok, res);
  }

  @Post('get/comunalAll')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getComunalAll(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.getComunalAll(tok, res);
  }

  @Post('get/comunalYear')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getComunalYearAll(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.getComunalYearAll(tok, res);
  }

  @Post('get/button')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getComunalbutton(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.getComunalbutton(tok, res);
  }


  @Post('delete/button')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deleteComunalbutton(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.deleteComunalbutton(tok, res);
  }

  @Post('delete/comunal')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deleteComunal(@Response() res, @Body() tok: Object): Promise<any> {
    await this.ComunalService.deleteComunal(tok, res);
  }


}
