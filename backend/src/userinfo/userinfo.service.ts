/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';



@Injectable()
export class UserinfoService {
  constructor(private readonly appService: AppService) {}

  async getUserinfoService(tok: any, res: any): Promise<any> {
    let a = await this.appService.authentification(tok)
    if(a){
      let contacts = await this.appService.getContacts(a)
      let img = await this.appService.getUserImg(a)
      let agree = await this.appService.countagree(a.user_id)
      let par = await this.appService.getUserParams(a.user_id)
      if(img){
        res.status(200).json({ status: true, inf: a, cont: contacts, img: img, agree: agree, parametrs: par})
      }else{
        res.status(200).json({ status: true, inf: a, cont: contacts, img: "Фото не було знайдено", agree: agree, parametrs: par})
      }
    }
  }


  async getAgentinfo(tok: any, res: any): Promise<any> {
    const a = await this.appService.authentification(tok.auth);
    const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
    const admin = await this.appService.citizen(a.user_id, tok.flat_id);
    const agent_id = await this.appService.agent(tok.flat_id);
    if((a && fl && agent_id) || (a && admin.acces_agreement === 1 && admin.acces_added === 1 && agent_id)){   
      let contacts = await this.appService.getContacts(agent_id)
      let img = await this.appService.getUserImg(agent_id)
      let ag = await this.appService.getAgentFLS(agent_id.user_id)
      if(img){
        res.status(200).json({ status: true, inf: ag, cont: contacts, img: img})
      }else{
        res.status(200).json({ status: true, inf: ag, cont: contacts, img: "Фото не було знайдено"})
      }
  }else if((a && admin.acces_agreement === 1 && admin.acces_added === 1) || (a && fl)){
    const owner = await this.appService.getFlatOwner(tok.flat_id);
    let contacts = await this.appService.getContacts({user_id: owner.owner_id})
    let img = await this.appService.getUserImg({user_id: owner.owner_id})
    let ag = await this.appService.getAgentFLS(owner.owner_id)
    if(img){
      res.status(200).json({ status: true, inf: ag, cont: contacts, img: img})
    }else{
      res.status(200).json({ status: true, inf: ag, cont: contacts, img: "Фото не було знайдено"})
    }
  }
}


async getUserinfoPublic(tok: any, res: any): Promise<any> {
  const a = await this.appService.authentification(tok.auth);
  if(a){   
    let img = await this.appService.getUserImg(tok)
    let ag = await this.appService.getAgentFLS(tok.user_id)
    if(img){
      res.status(200).json({inf: ag, img: img})
    }else{
      res.status(200).json({ status: true, inf: ag, img: "Фото не було знайдено"})
    }
  }else{
    res.status(200).json({ status: false})
  }

}
}
