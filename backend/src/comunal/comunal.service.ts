/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';



@Injectable()
export class ComunalService {
    constructor(private readonly appService: AppService) {}

    async addComunal(tok: any, res: any): Promise<any> {
        //  Перевірити
        try{
            let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            await this.appService.addComunal(tok, a.user_id)
            res.status(200).json({ status: "Данні по комуналці успішно змінені" });
        }else if(a && admin.acces_comunal === 1){
            await this.appService.addComunal(tok, a.user_id)
            res.status(200).json({ status: "Данні по комуналці успішно змінені" });
        }else if(a && admin.acces_comunal_indexes === 1){
            let a = {flat_id: tok.flat_id, comunal_name: tok.comunal_name, when_pay_m: tok.when_pay_m, when_pay_y: tok.when_pay_y, comunal:{comunal_before: tok.comunal.comunal_before, comunal_now: tok.comunal.comunal_now, option_sendData:tok.comunal.option_sendData}}
            await this.appService.addComunalBefNow(a)
            res.status(200).json({ status:"Показники дадані" });
        }else{
            res.status(200).json({ status:false });
        }
        }catch{
            res.status(200).json({ status: false });}
        
    }

    async addComunalCompany(tok: any, res: any): Promise<any> {
        //  Перевірити
        try{
            let a = await this.appService.authentification(tok.auth)
            let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
            let admin = await this.appService.citizen(a.user_id, tok.flat_id)
            if(a && fl){
                await this.appService.addComunalCompany(tok)
                res.status(200).json({ status: "Данні по комуналці успішно змінені" });
            }else if(a && admin.acces_comunal === 1){
                await this.appService.addComunalCompany(tok)
                res.status(200).json({ status: "Данні по комуналці успішно змінені" });
            }else{
                res.status(200).json({ status: false });
            }
        }catch{
            res.status(200).json({ status: false });
        }
        
    }

    async addComunalbutton(tok: any, res: any): Promise<any> {
        //  Перевірити
        try{
            let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){           
            res.status(200).json(await this.appService.addComunalName(fl.flat_id,tok.comunal));
        }else if(a && admin.acces_comunal === 1){ 
            res.status(200).json(await this.appService.addComunalName(admin.flat_id,tok.comunal));
        }else{
            res.status(200).json({ status: false });
        }
        }catch{
            res.status(200).json({ status: false });
        }
        
    }

    async changeComunal(tok: any, res: any): Promise<any> {
        //  Перевірити
        try{
            let a = await this.appService.authentification(tok.auth)
            let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
            let admin = await this.appService.citizen(a.user_id, tok.flat_id)
            if(a && fl){
                await this.appService.addComunal(tok, a.user_id)
                res.status(200).json({ status: "Данні по комуналці успішно змінені" });
            }else if(a && admin.acces_comunal === 1){
                await this.appService.addComunal(tok, a.user_id)
                res.status(200).json({ status: "Данні по комуналці успішно змінені" });
            }else{
                res.status(200).json({ status: false });
            }
        }catch{
            res.status(200).json({ status: false });
        }
    }

    async getComunal(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let accept_subs = await this.appService.accept_subs(a.user_id, tok.flat_id)
        if(a && fl){  
            res.status(200).json({ comunal: await this.appService.getComunalYear(fl.flat_id, tok.comunal_name, tok.when_pay_y) });
        }else if(a && accept_subs || admin){
            res.status(200).json({ comunal: await this.appService.getComunalYear(tok.flat_id, tok.comunal_name, tok.when_pay_y) });
        }else{
            res.status(200).json({ status: false });
        }
    }


    async getComunalAll(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let accept_subs = await this.appService.accept_subs(a.user_id, tok.flat_id)
        if(a && fl){  
            let flat_name = await this.appService.getFlatName(fl.flat_id)
            res.status(200).json({ comunal: await this.appService.getComunalAll(fl.flat_id, tok.when_pay_m, tok.when_pay_y), flat_name: flat_name });
        }else if(a && accept_subs || admin){
            let flat_name = await this.appService.getFlatName(tok.flat_id)
            res.status(200).json({ comunal: await this.appService.getComunalAll(tok.flat_id, tok.when_pay_m, tok.when_pay_y), flat_name: flat_name});
        }else{
            res.status(200).json({ status: false });
        }
    }


    async getComunalYearAll(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let accept_subs = await this.appService.accept_subs(a.user_id, tok.flat_id)
        if(a && fl){  
            let flat_name = await this.appService.getFlatName(fl.flat_id)
            res.status(200).json({ comunal: await this.appService.getComunalYearAll(fl.flat_id, tok.when_pay_y), flat_name: flat_name });
        }else if(a && accept_subs || admin){
            let flat_name = await this.appService.getFlatName(tok.flat_id)
            res.status(200).json({ comunal: await this.appService.getComunalYearAll(tok.flat_id, tok.when_pay_y), flat_name: flat_name });
        }else{
            res.status(200).json({ status: false });
        }
    }

    async getComunalbutton(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        let accept_subs = await this.appService.accept_subs(a.user_id, tok.flat_id)
        if(a && fl){  
            res.status(200).json({ comunal: await this.appService.getComunalName(fl.flat_id) });
        }else if(a && admin){
            res.status(200).json({ comunal: await this.appService.getComunalName(tok.flat_id) });
        }else if(a && accept_subs){
            res.status(200).json({ comunal: await this.appService.getComunalNameDiscuss(tok.flat_id) });
        }else{
            
            res.status(200).json({ status: false });
        }
    }


    async deleteComunalbutton(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if(a && fl){
            await this.appService.deleteComunal(fl.flat_id, tok.comunal_name)
        }else if(a && admin.comunal === 1){
            await this.appService.deleteComunal(admin.flat_id, tok.comunal_name)
        }else{
            res.status(200).json({ status: false });
        }
    }


    async deleteComunal(tok: any, res: any): Promise<any> {
        //  Перевірити
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.new.houseId)
        let admin = await this.appService.citizen(a.user_id, tok.new.houseId)
        if(a && fl){
            conee.query('DELETE FROM comunal WHERE flat_id = ?, comunal_name = ?, when_pay_m = ?, when_pay_y = ?;', [fl.flat_id, tok.new.comunal_name, tok.new.when_pay_m, tok.new.when_pay_y])
        }else if(a && admin.comunal === 1){
            conee.query('DELETE FROM comunal WHERE flat_id = ?, comunal_name = ?, when_pay_m = ?, when_pay_y = ?;', [admin.flat_id, tok.new.comunal_name, tok.new.when_pay_m, tok.new.when_pay_y])
        }else{
            res.status(200).json({ status: false });
        }
    }


}
