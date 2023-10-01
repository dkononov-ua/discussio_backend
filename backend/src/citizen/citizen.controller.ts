import { Controller, Post, Response, Body } from "@nestjs/common";
import { CitizenService } from "./citizen.service";

@Controller("citizen")
export class CitizenController {
  constructor(private readonly citizenService: CitizenService) {}

  @Post("add/access")
  // eslint-disable-next-line @typescript-eslint/ban-types
  async acceptSubscribes(@Response() res, @Body() tok: Object): Promise<any> {
    await this.citizenService.addAccess(tok, res);
  }


  @Post("add/agreeSit")
  // eslint-disable-next-line @typescript-eslint/ban-types
  async agreeSit(@Response() res, @Body() tok: Object): Promise<any> {
    await this.citizenService.agreeSit(tok, res);
  }

  @Post("delete/citizen")
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deleteSubs(@Response() res, @Body() tok: Object): Promise<any> {
    await this.citizenService.deleteCitizen(tok, res);
  }


  @Post("get/citizen")
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getSubs(@Response() res, @Body() tok: Object): Promise<any> {
    await this.citizenService.getCitizen(tok, res);
  }

  @Post("get/ycitizen")
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getYSubs(@Response() res, @Body() tok: Object): Promise<any> {
    await this.citizenService.getCitizenFlats(tok, res);
  }



  @Post('get/CountCitizen')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getCountCitizen(@Response() res, @Body() tok: Object): Promise<any> {
    await this.citizenService.getCountCitizen(tok, res);
  }

  @Post('get/CountYCitizen')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getCountYCitizen(@Response() res, @Body() tok: Object): Promise<any> {
    await this.citizenService.getCountYCitizen(tok, res);
  }
}
