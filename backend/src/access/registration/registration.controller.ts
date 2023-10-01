import { Controller, Post, Response, Body } from '@nestjs/common';
import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {

  constructor(private readonly regService: RegistrationService) {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getRegister(@Response() res, @Body() tok: Object): Promise<any> {
    await this.regService.getRegister(tok, res);
  }


}
