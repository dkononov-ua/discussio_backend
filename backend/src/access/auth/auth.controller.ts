import { Controller, Post, Response, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getAuth(@Response() res, @Body() tok: Object): Promise<any> {
      await this.authService.getAuth(tok, res);
    }

}
