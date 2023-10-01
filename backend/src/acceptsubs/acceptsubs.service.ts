/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';



@Injectable()
export class AcceptSubsService {
    constructor(private readonly appService: AppService) {}


    async acceptSubscribes(tok: object | any, res: any){
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let cit = await this.appService.citizen(tok.user_id, tok.flat_id)
        let par = await this.appService.getUserParams(tok.user_id)
        if(a && fl && cit === false && par.add_in_flat == 1){
            conee.query('INSERT INTO citizen (user_id, flat_id) VALUES (?, ?)', [tok.user_id, fl.flat_id],(err, resul)=>{console.log(err)})
            conee.query('DELETE FROM accept_subs WHERE flat_id = ? AND user_id = ?;', [fl.flat_id, tok.user_id],(err, resul)=>{1})
            res.status(200).json({ status: true });
        }else if(a && admin.acces_discuss === 1 && cit === false && par.add_in_flat == 1){
            conee.query('INSERT INTO citizen (user_id, flat_id) VALUES (?, ?)', [tok.user_id ,admin.flat_id],(err, resul)=>{1})
            conee.query('DELETE FROM accept_subs WHERE flat_id = ? AND user_id = ?;', [admin.flat_id, tok.user_id],(err, resul)=>{1})
            res.status(200).json({ status: true });
        }else{
            res.status(200).json({ status: false });
        }
    }


    async deleteSubs(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let accept_subs = await this.appService.accept_subs(tok.user_id, tok.flat_id)
        if(a && fl && accept_subs){
            conee.query('DELETE FROM accept_subs WHERE flat_id = ? AND user_id = ?;', [fl.flat_id, accept_subs.user_id])
            res.status(200).json({ status: true });
        }else if(a && admin.acces_discuss === 1 && accept_subs){
            conee.query('DELETE FROM accept_subs WHERE flat_id = ? AND user_id = ?;', [admin.flat_id, accept_subs.user_id])
            res.status(200).json({ status: true });
        }else{
            res.status(200).json({ status: false });
        }
    }

    async deleteYSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            conee.query('DELETE FROM accept_subs WHERE flat_id = ? AND user_id = ?;', [tok.flat_id, a.user_id])
            res.status(200).json({ status: true });
        }else{
            res.status(200).json({ status: false });
        }
    }


    async getAccepSubs(tok: any, res: any): Promise<any> {
        //  Перевірити
        
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            let subsID:Array<any> | any = await this.appService.getIDAccSubs(fl.flat_id, tok.offs)
            let subs = await Promise.all(subsID.map(async (e : any) => {
                return await this.appService.getAccSubs(e.user_id)      
            }));
            res.status(200).json( subs );
        }else if(a && admin.acces_discuss === 1){
            
            let subsID:Array<any> | any = await this.appService.getIDAccSubs(admin.flat_id, tok.offs)
            let subs = await Promise.all(subsID.map(async (e : any) => {
                return await this.appService.getAccSubs(e.user_id)      
            }));
            res.status(200).json( subs );
        }else{
            res.status(200).json({ status: false });
        }
    }

    async getAccepYSubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            
            let flIDSubs:Array<any> | any = await this.appService.getIDAccFlats(a.user_id, tok.offs)
            let flatSu = await Promise.all(flIDSubs.map(async (e : any) => {
                return await this.appService.getFlatforAccSubs(e.flat_id)      
            }));
            res.status(200).json( flatSu );
        }else{
            res.status(200).json({ status: false });
        }
    }


    async getCountSubs(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            res.status(200).json({ status: await this.appService.countYdisc(tok.flat_id) });
        }else if(a && admin.acces_discuss === 1){
            res.status(200).json({ status: await this.appService.countYdisc(tok.flat_id) });
        }else{
            res.status(200).json({ status: false });
        }
    }

    async getCountYsubs(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            res.status(200).json({ status: await this.appService.countDisc(a.user_id) });
        }else{
            res.status(200).json({ status: false });
        }
    }



}
