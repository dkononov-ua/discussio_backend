/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';

@Injectable()
export class SubsService {
    constructor(private readonly appService: AppService) { }

    async subscribe(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl_rent = await this.appService.flatRentCheck(tok.flat_id)
        let ac_subs = await this.appService.accept_subs(a.user_id, tok.flat_id)
        let subs = await this.appService.subscribes(a.user_id, tok.flat_id)
        if (a && fl_rent && ac_subs === false && subs === false) {
            conee.query('INSERT INTO subscribes (user_id, flat_id) VALUES (?, ?)', [a.user_id, tok.flat_id])
            res.status(200).json({ status: "Ви успішно підписались" });
        } else if (a && fl_rent && ac_subs === false && subs) {
            conee.query('DELETE FROM subscribes WHERE flat_id = ? AND user_id = ?;', [tok.flat_id, a.user_id])
            res.status(200).json({ status: "Ви успішно відписались" });
        } else {
            res.status(200).json({ status: "Ви в дискусії" });
        }
    }


    async checkSubscribe(tok: any, res: any): Promise<any> {
        try {
            let a = await this.appService.authentification(tok.auth)
            let fl_rent = await this.appService.flatRentCheck(tok.flat_id)
            let ac_subs = await this.appService.accept_subs(a.user_id, tok.flat_id)
            let subs = await this.appService.subscribes(a.user_id, tok.flat_id)
            if (a && fl_rent && ac_subs === false && subs === false) {
                res.status(200).json({ status: "Ви успішно підписались" });
            } else if (a && fl_rent && ac_subs === false && subs) {
                res.status(200).json({ status: "Ви успішно відписались" });
            } else {
                res.status(200).json({ status: "Ви в дискусії" });
            }
        } catch {
            res.status(200).json({ status: "Ви не авторизовані" });
        }

    }

    async acceptSubscribes(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let subs = await this.appService.subscribes(tok.user_id, tok.flat_id)
        let acc_subs = await this.appService.accept_subs(tok.user_id, tok.flat_id)
        if (a && fl && subs && acc_subs === false) {
            conee.query('INSERT INTO accept_subs (user_id, flat_id) VALUES (?, ?)', [tok.user_id, tok.flat_id])
            conee.query('DELETE FROM subscribes WHERE flat_id = ? AND user_id = ?;', [tok.flat_id, tok.user_id])
            res.status(200).json({ status: true });
        } else if (a && admin.acces_subs === 1 && subs && acc_subs === false) {
            conee.query('INSERT INTO accept_subs (user_id, flat_id) VALUES (?, ?)', [tok.user_id, tok.flat_id])
            conee.query('DELETE FROM subscribes WHERE flat_id = ? AND user_id = ?;', [tok.flat_id, tok.user_id])
            res.status(200).json({ status: true });
        } else if(a && (fl || admin.acces_subs === 1) && subs && acc_subs) {
            res.status(200).json({ status: "Ви вже в дискусії" });
        }else{
            res.status(200).json({ status: false });
        }
    }


    async deleteSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let subs = await this.appService.subscribes(tok.user_id, tok.flat_id)
        if (a && fl && subs) {
            conee.query('DELETE FROM subscribes WHERE flat_id = ? AND user_id = ?;', [fl.flat_id, tok.user_id])
            res.status(200).json({ status: true });
        } else if (a && admin.acces_subs === 1 && subs) {
            conee.query('DELETE FROM subscribes WHERE flat_id = ? AND user_id = ?;', [admin.flat_id, tok.user_id])
            res.status(200).json({ status: true });
        } else {
            res.status(200).json({ status: false });
        }
    }

    async deleteYSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if (a) {
            conee.query('DELETE FROM subscribes WHERE flat_id = ? AND user_id = ?;', [tok.flat_id, a.user_id])
            res.status(200).json({ status: true });
        } else {
            res.status(200).json({ status: false });
        }
    }


    async getSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        if (a && fl) {
            // Працює
            let subsID: Array<any> | any = await this.appService.getIDSubs(fl.flat_id, tok.offs)
            let subs = await Promise.all(subsID.map(async (e: any) => {
                return await this.appService.getSubs(e.user_id)
            }));
            res.status(200).json(subs);
        } else if (a && admin.acces_subs === 1) {
            let subsID: Array<any> | any = await this.appService.getIDSubs(admin.flat_id, tok.offs)
            let subs = await Promise.all(subsID.map(async (e: any) => {
                return await this.appService.getSubs(e.user_id)
            }));
            res.status(200).json(subs);
        } else {
            res.status(200).json({ status: false });
        }
    }

    async getYSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let flIDSubs: Array<any> | any = await this.appService.getIDFlats(a.user_id, tok.offs)
        if (a && flIDSubs) {
            let flatSu = await Promise.all(flIDSubs.map(async (e: any) => {
                return await this.appService.getFlatforSubs(e.flat_id)
            }));
            res.status(200).json(flatSu);
        } else {
            res.status(200).json({ status: false });
        }
    }


    async getCountSubs(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id);
        let admin = await this.appService.citizen(a.user_id, tok.flat_id);
        if (a && fl) {
            res.status(200).json({ status: await this.appService.countSubs(tok.flat_id) });
        } else if (a && admin.acces_subs === 1) {
            res.status(200).json({ status: await this.appService.countSubs(tok.flat_id) });
        } else {
            res.status(200).json({ status: false });
        }
    }
    
      async getCountYSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            res.status(200).json({ status: await this.appService.countYSubs(a.user_id) });
        }else{
            res.status(200).json({ status: false });
        }
    }

}
