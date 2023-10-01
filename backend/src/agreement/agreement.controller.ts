import { Controller, Post, Response, Body } from '@nestjs/common';
import { AgreementService } from './agreement.service';



@Controller('agreement')
export class AgreementController {
    constructor(private readonly agreementService: AgreementService) {}


    @Post('add/agreement')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async addAgreement(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.addAgreement(tok, res);
    }

    @Post('accept/agreement')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async acceptAgreement(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.acceptAgreement(tok, res);
    }

    @Post('delete/agreement')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async deleteAgreement(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.deleteAgreement(tok, res);
    }

    @Post('delete/yagreement')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async deleteYAgreement(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.deleteYAgreement(tok, res);
    }

    @Post('get/agreement')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getAgreement(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.getAgreement(tok, res);
    }

    @Post('get/agreements')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getAgreements(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.getAgreements(tok, res);
    }

    @Post('get/yagreement')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getYAgreement(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.getYAgreement(tok, res);
    }

    @Post('get/yagreements')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getYAgreements(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.getYAgreements(tok, res);
    }

    @Post('get/saveagreements')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getSaveAgreement(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.getSaveAgreements(tok, res);
    }

    @Post('get/saveyagreements')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getSaveYAgreement(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.getSaveYAgreements(tok, res);
    }


    @Post('add/act')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async addAct(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.addAct(tok, res);
    }

    
    @Post('get/act')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getAct(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.getAct(tok, res);
    }

    @Post('get/yAct')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getYAct(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.getYAct(tok, res);
    }


    @Post('delete/act')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async deleteAct(@Response() res, @Body() tok: Object): Promise<any> {
      await this.agreementService.deleteAct(tok, res);
    }

}
