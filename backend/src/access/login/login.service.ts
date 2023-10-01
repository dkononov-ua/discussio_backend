import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';




@Injectable()
export class LoginService {
  constructor(private readonly appService: AppService) {}


    async getLogin(tok: any, res: any): Promise<any> {
      let a = await this.appService.authentification(tok)
      if(a){
        res.status(200).json({ status: true, email: a.user_mail, password: a.password, you:"sweet" });
      }else{
        res.status(200).json({ status: false });
      }
    }
}
