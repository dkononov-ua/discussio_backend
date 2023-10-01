/* eslint-disable prettier/prettier */
import { Controller, Post, Response, Body } from '@nestjs/common';
import { FlatinfoService } from './flatinfo.service';



@Controller('flatinfo')
export class FlatinfoController {
  constructor(private readonly FlatinfoService: FlatinfoService) {}


  @Post('add/flat_id')
    // eslint-disable-next-line @typescript-eslint/ban-types
  async getflat_idService(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.getflat_idService(tok, res);
  }


  @Post('add/addres')
    // eslint-disable-next-line @typescript-eslint/ban-types
  async getFlatinfoService(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.getflatinfoService(tok, res);
  }

  @Post('add/about')
    // eslint-disable-next-line @typescript-eslint/ban-types
  async getflataboutService(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.getflataboutService(tok, res);
  }

  @Post('add/parametrs')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getparametrsService(@Response() res, @Body() tok: Object): Promise<any> {
  await this.FlatinfoService.getparametrsService(tok, res);
  }

  @Post('localflat')
    // eslint-disable-next-line @typescript-eslint/ban-types
  async getFlatService(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.getFlatService(tok, res);
  }

  @Post('localflatid')
    // eslint-disable-next-line @typescript-eslint/ban-types
  async getflat_idsService(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.getflat_idsService(tok, res);
  }

  @Post('deleteflat')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getdeleteflat(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.getdeleteflat(tok, res);
  }


  @Post('public')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getFlatPublicInfo(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.getFlatPublicInfo(tok, res);
  }

  @Post('get/filling')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getFilling(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.getFilling(tok, res);
  }

  @Post('deletefilling')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deleteFilling(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.deleteFilling(tok, res);
  }


  @Post('get/flatinf')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getFlatinf(@Response() res, @Body() tok: Object): Promise<any> {
  await this.FlatinfoService.getFlatinf(tok, res);
  }

  @Post('add/flatinf')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async addFlatinf(@Response() res, @Body() tok: Object): Promise<any> {
  await this.FlatinfoService.addFlatinf(tok, res);
  }

  @Post('deleteFlatImg')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deleteFlatImg(@Response() res, @Body() tok: Object): Promise<any> {
    await this.FlatinfoService.deleteFlatImg(tok, res);
  }
  
}