/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';



@Injectable()
export class AddService {
    constructor(private readonly appService: AppService) {}

    async getUserinfoServiceAdd(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            conee.query("UPDATE users SET firstName = ?, lastName = ?, surName = ?, password = ? WHERE user_id = ?",
                [tok.new.firstName, tok.new.lastName, tok.new.surName, tok.auth.password, a.user_id],
                (err, resuuuu)=>{
                    if (err) {  
                        res.status(200).json({ status: "Не правильно передані данні" })
                    }else{
                        res.status(200).json({ status: true, inf:a });                            
                    }
                })
        }else{
            res.status(200).json({ status: false });
        }
    }

    
    async getUsercontactsServiceAdd(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            conee.query("UPDATE contacts SET instagram = ?, telegram = ?, viber = ?, facebook = ?, tell = ?, phone_alt = ?, mail = ? WHERE user_id = ?",
                [tok.new.instagram, tok.new.telegram, tok.new.viber, tok.new.facebook, tok.new.tell, tok.new.phone_alt, tok.new.mail, a.user_id],
                (err, resuuuu)=>{
                    if (err) {  
                        res.status(200).json({ status: "Не правильно передані данні" })
                    }else{
                        res.status(200).json({ status: true});                            
                    }
                })
        }else{
            res.status(200).json({ status: false });
        }
    }

    async addUserParams(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            conee.query("UPDATE user_parametrs SET add_in_flat = ? WHERE user_id = ?",
                [tok.add_in_flat, a.user_id],
                (err, resuuuu)=>{
                    if (err) {  
                        res.status(200).json({ status: "Не правильно передані данні" })
                    }else{
                        res.status(200).json({ status: true});                            
                    }
                })
        }else{
            res.status(200).json({ status: false });
        }
    }

}
