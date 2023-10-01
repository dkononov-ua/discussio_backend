import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import conee from 'src/db';




@Injectable()
export class AuthService {
  constructor(private readonly appService: AppService) {}

  async getAuth(tok: any, res: any): Promise<any> {
    let a = await this.appService.authentification(tok)
    if(a){
      res.status(200).json({ status: true, email: a.email, password: a.password, you:"sweet" });
    }else{
      res.status(200).json({ status: false });
    }
  }

}
