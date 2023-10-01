/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';

@Injectable()
export class AgreementService {
    constructor(private readonly appService: AppService) {}



    async addAgreement(tok: object | any, res: any){
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        const agent_id = await this.appService.agent(tok.flat_id);
        if((a && fl && agent_id) || (a && admin.acces_agreement === 1 && admin.acces_added === 1 && agent_id)){   
            if (await this.appService.addAgreement(tok, agent_id.user_id, tok.flat_id)){
                res.status(200).json({ status: "Договір створено" });
            }else{
                res.status(200).json({ status: "Данні введено не правильно" });
            }
        }else if((a && admin.acces_agreement === 1 && admin.acces_added === 1) || (a && fl)){
            let owner = await this.appService.getFlatOwner(tok.flat_id);
            if(await this.appService.addAgreement(tok, owner.owner_id, tok.flat_id)){
                res.status(200).json({ status: "Договір створено" });
            }else{
                res.status(200).json({ status: "Данні введено не правильно" });
            }
        }else{
            res.status(200).json({ status: "Данні введено не правильно" });
        }
    }

    async acceptAgreement(tok: object | any, res: any){
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let agree = await this.appService.getAgreement(tok.agreement_id, tok.flat_id, a.user_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && agree){
            conee.query(
                "UPDATE agreement SET i_agree = ? WHERE agreement_id = ?",[tok.i_agree, agree.agreement_id],(err,result)=>{
                    if(admin){
                        res.status(200).json({ status: true });
                    }else{
                        res.status(200).json({ status: "Додано мешканця" });
                    }
                })
        }else{
            res.status(200).json({ status: false });
        }
    }

    async deleteAgreement(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            let agree = await this.appService.getAgreement(tok.agreement_id, fl.flat_id, tok.user_id)
            if (agree){
                conee.query('DELETE FROM agreement_act WHERE agreement_id = ?;', [agree.agreement_id])
                conee.query('DELETE FROM agreement_filling WHERE agreement_id = ?;', [agree.agreement_id])
                conee.query(
                    'DELETE FROM agreement WHERE agreement_id = ?;',[agree.agreement_id],(err,result)=>{
                        res.status(200).json({ status: true });
                    })
            }else{
                res.status(200).json({ status: "Данні введено не правильно" });
            }
        }else if(a && admin.acces_agreement === 1){
            let agree = await this.appService.getAgreement(tok.agreement_id, admin.flat_id, tok.user_id)
            if (agree){
                conee.query('DELETE FROM agreement_act WHERE agreement_id = ?;', [agree.agreement_id])
                conee.query('DELETE FROM agreement_filling WHERE agreement_id = ?;', [agree.agreement_id])
                conee.query(
                    'DELETE FROM agreement WHERE agreement_id = ?;',[agree.agreement_id],(err,result)=>{
                        res.status(200).json({ status: true });
                    })
            }else{
                res.status(200).json({ status: "Данні введено не правильно" });
            }
        }else{
            res.status(200).json({ status: "Данні введено не правильно" });
        }
    }

    async deleteYAgreement(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let agree = await this.appService.getAgreement(tok.agreement_id, tok.flat_id, a.user_id)
        if(a && agree){
            conee.query('DELETE FROM agreement_act WHERE agreement_id = ?;', [agree.agreement_id])
            conee.query('DELETE FROM agreement_filling WHERE agreement_id = ?;', [agree.agreement_id])
            conee.query('DELETE FROM agreement WHERE agreement_id = ?;', [agree.agreement_id])
            res.status(200).json({ status: true });
        }else{
            res.status(200).json([{ status: false }]);
        }
    }

// МБ видалити
    async getAgreement(tok: any, res: any): Promise<any> {
        //  Перевірити  
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            let agreement = await this.appService.getUserAgreement(fl.flat_id, a.user_id, tok.offs)        
            res.status(200).json( agreement );
        }else if(a && admin.acces_agreement === 1){
            let agreement = await this.appService.getUserAgreement(admin.flat_id, a.user_id, tok.offs)
            res.status(200).json( agreement );
        }else{
            res.status(200).json([{ status: false }]);
        }
    }


    async getAgreements(tok: any, res: any): Promise<any> {
        //  Перевірити

        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            let agreement = await this.appService.getAllAgreement(fl.flat_id, tok.offs)    
            res.status(200).json( agreement );
        }else if(a && admin.acces_agreement === 1){
            let agreement = await this.appService.getAllAgreement(admin.flat_id, tok.offs)
            res.status(200).json( agreement );
        }else{
            res.status(200).json([{ status: false }]);
        }
    }

    async getYAgreement(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            let agreement = await this.appService.getUserAgreement(tok.flat_id, a.user_id, tok.offs) 
            res.status(200).json( agreement );
        }else{
            res.status(200).json([{ status: false }]);
        }
    }

    async getYAgreements(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            let agreement = await this.appService.getAllYAgreement(a.user_id, tok.offs) 
            res.status(200).json( agreement );
        }else{
            res.status(200).json([{ status: false }]);
        }
    }


    async getSaveAgreements(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            let agreement = await this.appService.getAllSaveAgreement(fl.flat_id, tok.offs)    
            res.status(200).json( agreement );
        }else if(a && admin.acces_agreement === 1){
            let agreement = await this.appService.getAllSaveAgreement(admin.flat_id, tok.offs)
            res.status(200).json( agreement );
        }else{
            res.status(200).json([{ status: false }]);
        }
    }

    async getSaveYAgreements(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            let agreement = await this.appService.getAllSaveYAgreement(a.user_id, tok.offs) 
            res.status(200).json( agreement );
        }else{
            res.status(200).json([{ status: false }]);
        }
    }

    async addAct(tok: object | any, res: any){
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl ){   
            if (await this.appService.addAct(tok, tok.agreement_id, fl.flat_id)){
                res.status(200).json({ status: "Договір створено" });
            }else{
                res.status(200).json({ status: "Данні введено не правильно" });
            }
        }else if(a && admin.acces_agreement === 1 && admin.acces_added === 1){
            if(await this.appService.addAct(tok, tok.agreement_id, admin.flat_id)){
                res.status(200).json({ status: "Договір створено" });
            }else{
                res.status(200).json({ status: "Данні введено не правильно" });
            }
        }else{
            res.status(200).json({ status: "Данні введено не правильно" });
        }
    }

    async getAct(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            let agreement = await this.appService.getAct(tok.agreement_id, fl.flat_id)    
            res.status(200).json( agreement );
        }else if(a && admin.acces_agreement === 1){
            let agreement = await this.appService.getAct(tok.agreement_id, admin.flat_id)
            res.status(200).json( agreement );
        }else{
            res.status(200).json([{ status: false }]);
        }
    }

    async getYAct(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            let agreement = await this.appService.getAct(tok.agreement_id, a.user_id) 
            res.status(200).json( agreement );
        }else{
            res.status(200).json([{ status: false }]);
        }
    }


    async deleteAct(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            let agree = await this.appService.getAgreement(tok.agreement_id, fl.flat_id, tok.user_id)
            if (agree){
                conee.query('DELETE FROM agreement_act WHERE agreement_id = ?;', [agree.agreement_id])
                conee.query('DELETE FROM agreement_filling WHERE agreement_id = ?;', [agree.agreement_id])
            }else{
                res.status(200).json({ status: "Данні введено не правильно" });
            }
        }else if(a && admin.acces_agreement === 1){
            let agree = await this.appService.getAgreement(tok.agreement_id, admin.flat_id, tok.user_id)
            if (agree){
                conee.query('DELETE FROM agreement_act WHERE agreement_id = ?;', [agree.agreement_id])
                conee.query('DELETE FROM agreement_filling WHERE agreement_id = ?;', [agree.agreement_id])
            }else{
                res.status(200).json({ status: "Данні введено не правильно" });
            }
        }else{
            res.status(200).json({ status: "Данні введено не правильно" });
        }
    }

}
