/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import conee from "src/db";
import { AppService } from "src/app.service";

@Injectable()
export class CitizenService {
  constructor(private readonly appService: AppService) {}

  async addAccess(tok: any, res: any): Promise<any> {
    //  Перевірити
    const a = await this.appService.authentification(tok.auth);
    const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
    const admin = await this.appService.citizen(a.user_id, tok.flat_id);
    const citizen = await this.appService.citizen(tok.user_id, tok.flat_id);
    const agent_id = await this.appService.agent(tok.flat_id);
    if (
      (a && fl && agent_id === false && citizen) ||
      (a &&
        admin.acces_added === 1 &&
        admin.acces_admin === 1 &&
        citizen &&
        agent_id === false && admin.acces_citizen === 1) ||
        (a && fl && agent_id && citizen && agent_id.user_id === tok.user_id) ||
        (a &&
          admin.acces_added === 1 &&
          admin.acces_admin === 1 &&
          citizen &&
          agent_id === false && admin.acces_citizen === 1 && agent_id.user_id === tok.user_id)
    ) {
      conee.query(
        "UPDATE citizen SET acces_added = ?, acces_admin = ?, acces_services = ?, acces_comunal = ?, acces_filling = ?, acces_subs = ?, acces_discuss = ?, acces_agreement = ?, acces_citizen = ?, acces_comunal_indexes = ?, acces_agent = ?, acces_flat_features = ?, acces_flat_chats = ? WHERE flat_id = ? AND user_id = ?",
        [
          tok.acces_added,
          tok.acces_admin,
          tok.acces_services,
          tok.acces_comunal,
          tok.acces_filling,
          tok.acces_subs,
          tok.acces_discuss,
          tok.acces_agreement,
          tok.acces_citizen,
          tok.acces_comunal_indexes,
          tok.acces_agent,
          tok.acces_flat_features,
          tok.acces_flat_chats,
          tok.flat_id,
          tok.user_id,
        ],
        (errrr, resu) => {
          res.status(200).json({ status: ")" });
        }
      );
    } else if (
      (a && fl && citizen && agent_id) ||
      (a && admin.acces_admin === 1 && citizen && admin.acces_added === 1 && agent_id && admin.acces_citizen === 1)
    ) {
      conee.query(
        "UPDATE citizen SET acces_added = ?, acces_admin = ?, acces_services = ?, acces_comunal = ?, acces_filling = ?, acces_subs = ?, acces_discuss = ?, acces_agreement = ?, acces_citizen = ?, acces_comunal_indexes = ?, acces_flat_features = ?, acces_flat_chats = ? WHERE flat_id = ? AND user_id = ?",
        [
          tok.acces_added,
          tok.acces_admin,
          tok.acces_services,
          tok.acces_comunal,
          tok.acces_filling,
          tok.acces_subs,
          tok.acces_discuss,
          tok.acces_agreement,
          tok.acces_citizen,
          tok.acces_comunal_indexes,
          tok.acces_flat_features,
          tok.acces_flat_chats,
          tok.flat_id,
          tok.user_id,
        ],
        (errrr, resu) => {
          res.status(200).json({ status: ")" });
        }
      );
    } else if (a && admin.acces_services === 1 && citizen && admin.acces_comunal_indexes === 1 && admin.acces_added === 1 && admin.acces_citizen === 1) {
      conee.query(
        "UPDATE citizen SET acces_services = ?, acces_comunal = ? WHERE flat_id = ? AND user_id = ?",
        [tok.acces_services, tok.acces_comunal_indexes, admin.flat_id, citizen.user_id],
        (errrr, resu) => {
          res.status(200).json({ status: ")" });
        }
      );
    } else {
      res.status(200).json({ status: false });
    }
  }


  async agreeSit(tok: any, res: any): Promise<any> {
    //  Перевірити
    const a = await this.appService.authentification(tok.auth);
    const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
    const admin = await this.appService.citizen(a.user_id, tok.flat_id);
    const citizen = await this.appService.citizen(tok.user_id, tok.flat_id);
    const agre = await this.appService.getUserSaveAgreement(tok.flat_id, tok.user_id);
    if (a && fl && citizen === false && agre) {
      conee.query('INSERT INTO citizen (user_id, flat_id) VALUES (?, ?)', [agre.subscriber_id, fl.flat_id], (err, resul)=>{console.log(err)});
      conee.query('DELETE FROM accept_subs WHERE flat_id = ? AND user_id = ?;', [fl.flat_id, agre.user_id], (err, resul)=>{1});
    } else if (a && admin.acces_citizen === 1 && admin.acces_agreement === 1 && agre) {
      conee.query('INSERT INTO citizen (user_id, flat_id) VALUES (?, ?)', [agre.subscriber_id, admin.flat_id], (err, resul)=>{console.log(err)});
      conee.query('DELETE FROM accept_subs WHERE flat_id = ? AND user_id = ?;', [admin.flat_id, agre.user_id], (err, resul)=>{1});
    } else {
      res.status(200).json({ status: false });
    }
  }


  async deleteCitizen(tok: any, res: any): Promise<any> {
    //  Перевірити
    const a = await this.appService.authentification(tok.auth);
    const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
    const admin = await this.appService.citizen(a.user_id, tok.flat_id);
    
    if (a && fl) {
      const citizen = await this.appService.citizen(tok.user_id, fl.flat_id);
      conee.query("DELETE FROM citizen WHERE flat_id = ? AND user_id = ?;", [
        fl.flat_id,
        citizen.user_id,
      ]);
      res.status(200).json({ status: true });
    } else if (a && admin.acces_admin === 1  && admin.acces_citizen === 1) {
      const citizen = await this.appService.citizen(tok.user_id, admin.flat_id);
      conee.query("DELETE FROM citizen WHERE flat_id = ? AND user_id = ?;", [
        admin.flat_id,
        citizen.user_id,
      ]);
      res.status(200).json({ status: true });
    } else if(a && admin) {
      conee.query("DELETE FROM citizen WHERE flat_id = ? AND user_id = ?;", [
        admin.flat_id,
        a.user_id,
      ]);
    }else{
      res.status(200).json({ status: false });
    }
  }


  async getCitizen(tok: any, res: any): Promise<any> {
    //  Перевірити
    const a = await this.appService.authentification(tok.auth);
    const fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
    const admin = await this.appService.citizen(a.user_id, tok.flat_id);
    if (a && fl) {
      const subsID: Array<any> | any = await this.appService.getIDCitizen(
        fl.flat_id,
        tok.offs
      );
      const cit = await Promise.all(
        subsID.map(async (e: any) => {
          return await this.appService.getCitizen(e.user_id, e.flat_id);
        })
      );
      res.status(200).json(cit);
    } else if (a && admin.acces_citizen === 1) {
      const subsID: Array<any> | any = await this.appService.getIDCitizen(
        admin.flat_id,
        tok.offs
      );
      const cit = await Promise.all(
        subsID.map(async (e: any) => {
          return await this.appService.getCitizen(e.user_id, e.flat_id);
        })
      );
      res.status(200).json(cit);
    } else if(a && admin) {
      const cit = await this.appService.getCitizen(a.user_id, admin.flat_id);
      res.status(200).json([cit]);
    }else{
      res.status(200).json({ status: false });
    }
  }

  async getCitizenFlats(tok: any, res: any): Promise<any> {
    const a = await this.appService.authentification(tok.auth);
    if (a) {
      const flIDSubs: Array<any> | any =
        await this.appService.getIDCitizenFlats(a.user_id, tok.offs);
        const flatSu = await Promise.all(
        flIDSubs.map(async (e: any) => {
          return await this.appService.getFlatforCitizen(e.flat_id);
        })
      );
      res.status(200).json(flatSu);
    } else {
      res.status(200).json({ status: false });
    }
  }


  async getCountCitizen(tok: any, res: any): Promise<any> {
    //  Перевірити
    let a = await this.appService.authentification(tok.auth)
    let fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
    let admin = await this.appService.citizen(a.user_id, tok.flat_id);
    if (a && fl) {
        res.status(200).json({ status: await this.appService.countCitizen(tok.flat_id) });
    } else if (a && admin.acces_citizen === 1) {
        res.status(200).json({ status: await this.appService.countCitizen(tok.flat_id) });
    } else {
        res.status(200).json({ status: false });
    }
}

  async getCountYCitizen(tok: any, res: any): Promise<any> {
    let a = await this.appService.authentification(tok.auth)
    if(a){
        res.status(200).json({ status: await this.appService.countYCitizen(a.user_id) });
    }else{
        res.status(200).json({ status: false });
    }
}

}
