/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';

@Injectable()
export class UsersubsService {
    constructor(private readonly appService: AppService) { }

    async subscribe(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let feature_user = await this.appService.feature_user(tok.user_id)
        let ac_subs = await this.appService.accept_subs(tok.user_id, tok.flat_id)
        let subs = await this.appService.user_subscribes(tok.user_id, tok.flat_id)
        if ((a && fl && ac_subs === false && subs === false && feature_user) || (a && feature_user && admin.acces_subs === 1 && ac_subs === false && subs === false)) {
            conee.query('INSERT INTO user_subscribes (user_id, flat_id) VALUES (?, ?)', [tok.user_id, tok.flat_id])
            res.status(200).json({ status: "Ви успішно підписались" });
        } else if ((a && feature_user && fl && ac_subs === false && subs) || (a && feature_user && admin.acces_subs === 1 && ac_subs === false && subs)) {
            conee.query('DELETE FROM user_subscribes WHERE flat_id = ? AND user_id = ?;', [tok.flat_id, tok.user_id])
            res.status(200).json({ status: "Ви успішно відписались" });
        } else {
            res.status(200).json({ status: "Ви в дискусії" });
        }
    }


    async checkSubscribe(tok: any, res: any): Promise<any> {
        try {
            let a = await this.appService.authentification(tok.auth)
            let admin = await this.appService.citizen(a.user_id, tok.flat_id)
            let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
            let feature_user = await this.appService.feature_user(tok.user_id)

            let ac_subs = await this.appService.accept_subs(tok.user_id, tok.flat_id)
            let subs = await this.appService.user_subscribes(tok.user_id, tok.flat_id)
            if ((a && fl && ac_subs === false && subs === false && feature_user) || (a && feature_user && admin.acces_subs === 1 && ac_subs === false && subs === false)) {
                res.status(200).json({ status: "Ви успішно відписались" });
            } else if ((a && feature_user && fl && ac_subs === false && subs) || (a && feature_user && admin.acces_subs === 1 && ac_subs === false && subs)) {
                res.status(200).json({ status: "Ви успішно підписались" });
            } else {
                res.status(200).json({ status: "Ви в дискусії" });
            }
        } catch {
            res.status(200).json({ status: "Ви не авторизовані" });
        }

    }

    async acceptSubscribes(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let subs = await this.appService.user_subscribes(a.user_id, tok.flat_id)
        let acc_subs = await this.appService.accept_subs(a.user_id, tok.flat_id)
        if (a && subs && acc_subs === false) {
            conee.query('INSERT INTO accept_subs (user_id, flat_id) VALUES (?, ?)', [subs.user_id, subs.flat_id])
            conee.query('DELETE FROM user_subscribes WHERE flat_id = ? AND user_id = ?;', [subs.flat_id, subs.user_id])
            res.status(200).json({ status: true });
        } else if (a && subs && acc_subs === false) {
            conee.query('INSERT INTO accept_subs (user_id, flat_id) VALUES (?, ?)', [subs.user_id, subs.flat_id])
            conee.query('DELETE FROM user_subscribes WHERE flat_id = ? AND user_id = ?;', [subs.flat_id, subs.user_id])
            res.status(200).json({ status: true });
        } else if (a && subs && acc_subs) {
            res.status(200).json({ status: "Ви вже в дискусії" });
        }else{
            res.status(200).json({ status: false });

        }
    }


    async deleteSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        if (a && fl) {
            conee.query('DELETE FROM user_subscribes WHERE flat_id = ? AND user_id = ?;', [fl.flat_id, tok.user_id])
            res.status(200).json({ status: true });
        } else if (a && admin.acces_subs === 1) {
            conee.query('DELETE FROM user_subscribes WHERE flat_id = ? AND user_id = ?;', [admin.flat_id, tok.user_id])
            res.status(200).json({ status: true });
        } else {
            res.status(200).json({ status: false });
        }
    }

    async deleteYSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if (a) {
            conee.query('DELETE FROM user_subscribes WHERE flat_id = ? AND user_id = ?;', [tok.flat_id, a.user_id])
            res.status(200).json({ status: true });
        } else {
            res.status(200).json({ status: false });
        }
    }


    async getYSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        if (a && fl) {
            // Працює
            let subsID: Array<any> | any = await this.appService.getIDuserSubs(fl.flat_id, tok.offs)
            let subs = await Promise.all(subsID.map(async (e: any) => {
                return await this.appService.getUserSubs(e.user_id)
                
            }));
            res.status(200).json(subs);
        } else if (a && admin.acces_subs === 1) {
            let subsID: Array<any> | any = await this.appService.getIDuserSubs(admin.flat_id, tok.offs)
            let subs = await Promise.all(subsID.map(async (e: any) => {
                return await this.appService.getUserSubs(e.user_id)
            }));
            res.status(200).json(subs);
        } else {
            res.status(200).json({ status: false });
        }
    }

    async getSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let flIDSubs: Array<any> | any = await this.appService.getUserIDFlats(a.user_id, tok.offs)
        if (a && flIDSubs) {
            let flatSu = await Promise.all(flIDSubs.map(async (e: any) => {
                return await this.appService.getFlatforUserSubs(e.flat_id)
            }));
            res.status(200).json(flatSu);
        } else {
            res.status(200).json({ status: false });
        }
    }


    async CountUserSubs(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
        let admin = await this.appService.citizen(a.user_id, tok.flat_id);
        if (a && fl) {
            res.status(200).json({ status: await this.appService.countUserSubs(tok.flat_id) });
        } else if (a && admin.acces_subs === 1) {
            res.status(200).json({ status: await this.appService.countUserSubs(tok.flat_id) });
        } else {
            res.status(200).json({ status: false });
        }
    }
    
      async CountYUserSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            res.status(200).json({ status: await this.appService.countYUserSubs(a.user_id) });
        }else{
            res.status(200).json({ status: false });
        }
    }


}
