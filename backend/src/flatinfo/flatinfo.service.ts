/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { unlink } from 'fs';
import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import conee from 'src/db';
import { AppService } from 'src/app.service';

@Injectable()
export class FlatinfoService {
    constructor(private readonly appService: AppService) { }

    async getparametrsService(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        if (a && fl) {
            conee.query("UPDATE parametrs SET rooms = ?, repair_status = ?, area = ?, kitchen_area = ?, balcony = ?, floor = ?, option_flat = ? WHERE flat_id = ?",
                [tok.new.rooms, tok.new.repair_status, tok.new.area, tok.new.kitchen_area, tok.new.balcony, tok.new.floor, tok.new.option_flat, fl.flat_id],
                (er, rrr) => {
                    if (er) {
                        res.status(200).json({ status: "Не правильно передані данні" })
                    } else {
                        res.status(200).json({ status: "Параметри успішно додані" });
                    }
                })
        } else {
            res.status(200).json({ status: "Не співпало ID квартири з користувачем" });
        }
    }

    async getflatinfoService(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        if (a && fl) {
            conee.query("UPDATE flat SET country = ?, region = ?, city = ?, street = ?,  houseNumber = ?, apartment = ?, flat_index = ?, distance_metro = ?, distance_stop = ?, distance_shop = ?, distance_green = ?, distance_parking = ? WHERE flat_id = ?",
                [tok.new.country, tok.new.region, tok.new.city, tok.new.street, tok.new.houseNumber, tok.new.apartment, tok.new.flat_index, tok.new.distance_metro, tok.new.distance_stop, tok.new.distance_shop, tok.new.distance_green, tok.new.distance_parking, fl.flat_id],
                (err, resuuuu) => {
                    if (err) {
                        res.status(200).json({ status: "Не правильно передані данні" })
                    } else {
                        res.status(200).json({ status: "Параметри успішно додані" });
                    }
                })
        } else {
            res.status(200).json({ status: "Не співпало ID квартири з користувачем" });
        }
    }

    async getflataboutService(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        const admin = await this.appService.citizen(a.user_id, tok.flat_id);
        if (a && fl) {
            conee.query("UPDATE about SET  woman = ?, man = ?, family = ?, students = ?, animals = ?, bunker = ?, price_m = ?, price_d = ?, option_pay = ?, room = ?, private = ?, rent = ?, data = ?, about = ? WHERE flat_id = ?",
                [tok.flat.woman, tok.flat.man, tok.flat.family, tok.flat.students, tok.flat.animals, tok.flat.bunker, tok.flat.price_m, tok.flat.price_d, tok.flat.option_pay, tok.flat.room, tok.flat.private, tok.flat.rent, new Date(), tok.flat.about, fl.flat_id],
                (er, rrrr) => {
                    if (er) {
                        res.status(200).json({ status: "Не правильно передані данні" })
                    } else {
                        res.status(200).json({ status: "Параметри успішно додані" });
                    }
                })
        } else if(a && admin.acces_flat_features === 1) {
            conee.query("UPDATE about SET  woman = ?, man = ?, family = ?, students = ?, animals = ?, bunker = ?, price_m = ?, price_d = ?, option_pay = ?, room = ?, private = ?, rent = ?, about = ?, data = ? WHERE flat_id = ?",
            [tok.flat.woman, tok.flat.man, tok.flat.family, tok.flat.students, tok.flat.animals, tok.flat.bunker, tok.flat.price_m, tok.flat.price_d, tok.flat.option_pay, tok.flat.room, tok.flat.private, tok.flat.rent, tok.flat.about, new Date(), admin.flat_id],
            (er, rrrr) => {
                if (er) {
                    res.status(200).json({ status: "Не правильно передані данні" })
                } else {
                    res.status(200).json({ status: "Параметри успішно додані" });
                }
            })

        }else{
            res.status(200).json({ status: "Не співпало ID квартири з користувачем" });

        }
    }

    async getFlatService(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        const admin = await this.appService.citizen(a.user_id, tok.flat_id);
        if (a && fl) {
            conee.query('SELECT * FROM about WHERE flat_id = ?', [fl.flat_id],
                (_errr, about_results) => {
                    conee.query('SELECT * FROM parametrs WHERE flat_id = ?', [fl.flat_id],
                        (_err, param_results) => {
                            conee.query('SELECT * FROM flat_img WHERE flat_id = ?', [fl.flat_id], (_err, img_results) => {
                                if (img_results[0] === undefined) {
                                    res.status(200).json({ status: true, flat: fl, about: about_results[0], param: param_results[0], imgs: "Картинок нема" });
                                } else {
                                    res.status(200).json({ status: true, flat: fl, about: about_results[0], param: param_results[0], imgs: img_results });
                                }
                            })
                        })
                })
        } else if(a && admin) {
            conee.query('SELECT apartment, city, street, country, houseNumber, flat_index, flat_id, flat_name, region FROM flat WHERE flat_id = ?', [admin.flat_id],(rrrrrr, flat_inf)=>{
                conee.query('SELECT * FROM about WHERE flat_id = ?', [admin.flat_id],
                (_errr, about_results) => {
                    conee.query('SELECT * FROM parametrs WHERE flat_id = ?', [admin.flat_id],
                        (_err, param_results) => {
                            conee.query('SELECT * FROM flat_img WHERE flat_id = ?', [admin.flat_id], (_err, img_results) => {
                                if (img_results[0] === undefined) {
                                    res.status(200).json({ status: true, flat: flat_inf[0], about: about_results[0], param: param_results[0], imgs: "Картинок нема", acces: admin });
                                } else {
                                    res.status(200).json({ status: true, flat: flat_inf[0], about: about_results[0], param: param_results[0], imgs: img_results, acces: admin });
                                }
                            })
                        })
                })
            })

            
        }else{
            res.status(200).json({ status: "Не співпало ID квартири з користувачем" });
        }
    }


    async getflat_idService(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.new.flat_id)
        if (a && fl === false) {
            conee.query('INSERT INTO flat (owner_id, flat_name) VALUES (?, ?)', [a.user_id, tok.new.flat_id],
                (err, resuuuu:any) => {
                    if (err) {
                        res.status(200).json({ status: "Не правильно передані данні" })
                    } else {
                        conee.query('INSERT INTO about (flat_id) VALUES (?)', [resuuuu.insertId]);
                        conee.query('INSERT INTO parametrs (flat_id) VALUES (?)', [resuuuu.insertId]);
                        res.status(200).json({ status: "Нова оселя успішно створена" });
                    }
                })
        } else {
            res.status(200).json({ status: "Будинок з таким ID вже існує" });
        }
    }


    async getflat_idsService(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok)
        if (a) {
            conee.query('SELECT flat_id, flat_name FROM flat WHERE owner_id = ?', [a.user_id],
                (_err, flat_ids) => {
                    conee.query('SELECT flat_id, acces_added, acces_admin, acces_services, acces_comunal, acces_filling, acces_subs, acces_discuss, acces_agreement, acces_citizen, acces_comunal_indexes, acces_agent, acces_flat_features, acces_flat_chats FROM citizen WHERE user_id = ?', [a.user_id],
                        async (err, citizen_ids) => {
                            let flat_names = await this.appService.getFlatNames(citizen_ids)
                            res.status(200).json({ status: true, ids: flat_ids, citizen_ids: flat_names });
                        })
                })
        } else {
            res.status(200).json({ status: "Не вірний імейл або пароль" });
        }
    }


    async getdeleteflat(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        if (a && fl) {
            conee.query('SELECT * FROM flat_img WHERE flat_id = ?;', [fl.flat_id], (er, re: RowDataPacket[]) => {
                re.forEach((i) => {
                    unlink("../../code/Static/flat/" + i.img, () => { null })
                })
            })
            conee.query('SELECT * FROM filling WHERE flat_id = ?;', [fl.flat_id], (er, re: RowDataPacket[]) => {
                re.forEach((i) => {
                    unlink("../../code/Static/filling/" + i.img, () => { null })
                })
            })
            await this.appService.deleteFlat(fl.flat_id)
            conee.query('DELETE FROM flat WHERE flat_id = ?', [fl.flat_id])
            res.status(200).json({ status: "Будинок успішно видалено :(" });
        } else {
            res.status(200).json({ status: "Будинок з таким ID вже існує" });
        }
    }

    async getFlatPublicInfo(tok: any, res: any): Promise<any> {
        const a = await this.appService.authentification(tok.auth);
        if(a){   
            conee.query('SELECT * FROM flat_img WHERE flat_id = ?', [tok.flat_id], (_err, img_results) => {
                if (img_results[0] === undefined) {
                    res.status(200).json({ status: true, flat: tok.flat_id, imgs: "Картинок нема"});
                } else {
                    res.status(200).json({ status: true, flat: tok.flat_id, imgs: img_results});
                }
            })
        }else{
          res.status(200).json({ status: false})
        }
    }


    async getFilling(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        const admin = await this.appService.citizen(a.user_id, tok.flat_id);
        if (a && fl) {
            conee.query('SELECT * FROM filling WHERE flat_id = ?', [tok.flat_id], (_err, results) => {
                res.status(200).json({ status: results});
            })
        } else if(a && admin) {
            conee.query('SELECT * FROM filling WHERE flat_id = ?', [tok.flat_id], (_err, results) => {
                res.status(200).json({ status: results});
            })
        }else{
            res.status(200).json({ status: "Не співпало ID квартири з користувачем" });
        }
    }

    async deleteFilling(tok: any, res: any) {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        const admin = await this.appService.citizen(a.user_id, tok.flat_id);
        if (a && fl) {
            conee.query('SELECT * FROM filling WHERE flat_id = ? AND filling_id = ?;', [fl.flat_id, tok.filling_id], async(er, re) => {
                if(re[0] !== undefined){
                    conee.query('DELETE FROM filling WHERE flat_id = ? AND filling_id = ?', [re[0].flat_id, re[0].filling_id])
                    if(re[0].img){
                        unlink("../../code/Static/filling/" + re[0].img, (e)=>{
                            res.status(200).json({ status: "Видалення було успішне" });
                        })
                    }else{
                        res.status(200).json({ status: "Видалення було успішне" }); 
                    }                        
                }
            })
        } else if(a && admin.acces_filling === 1) {
            conee.query('SELECT * FROM filling WHERE flat_id = ? AND filling_id = ?;', [admin.flat_id, tok.filling_id], async(er, re) => {
                if(re[0] !== undefined){
                    conee.query('DELETE FROM filling WHERE flat_id = ? AND filling_id = ?', [re[0].flat_id, re[0].filling_id])
                    if(re[0].img){
                            unlink("../../code/Static/filling/" + re[0].img, (e)=>{
                                res.status(200).json({ status: "Видалення було успішне" });
                            })
                    }else{
                        res.status(200).json({ status: "Видалення було успішне" }); 
                    }               
                }
            })
        }else{
            res.status(200).json({ status: "Не співпало ID квартири з користувачем" });
        }       
    }


    async getFlatinf(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        const admin = await this.appService.citizen(a.user_id, tok.flat_id);
        if (a && fl) {
            res.status(200).json(await this.appService.getFlatinf(fl.flat_id));
        } else if(a && admin) {
            res.status(200).json(await this.appService.getFlatinf(admin.flat_id));
        }else{
            res.status(200).json({ status: "Не співпало ID квартири з користувачем" });
        }
    }

    async addFlatinf(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        const admin = await this.appService.citizen(a.user_id, tok.flat_id);
        if (a && fl) {
            res.status(200).json({ status: await this.appService.addFlatinf(tok.new, fl.flat_id)});
            
        } else if(a && admin.acces_flat_features === 1) {
            res.status(200).json({ status: await this.appService.addFlatinf(tok.new, admin.flat_id)});
        }else{
            res.status(200).json({ status: "Не співпало ID квартири з користувачем" });
        }
    }


    async deleteFlatImg(tok: any, res: any) {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        const admin = await this.appService.citizen(a.user_id, tok.flat_id);
        if (a && fl) {
            conee.query('SELECT * FROM flat_img WHERE flat_id = ? AND img = ?;', [fl.flat_id, tok.img], async(er, re) => {
                if(re[0] !== undefined){
                    conee.query('DELETE FROM flat_img WHERE flat_id = ? AND img = ?', [re[0].flat_id, re[0].img])
                    if(re[0].img){
                        unlink("../../code/Static/flat/" + re[0].img, (e)=>{
                            res.status(200).json({ status: "Видалення було успішне" });
                        })
                    }else{
                        res.status(200).json({ status: "Видалення було успішне" }); 
                    }                        
                }
            })
        } else if(a && admin.acces_flat_features === 1) {
            conee.query('SELECT * FROM flat_img WHERE flat_id = ? AND img = ?;', [admin.flat_id, tok.img], async(er, re) => {
                if(re[0] !== undefined){
                    conee.query('DELETE FROM flat_img WHERE flat_id = ? AND img = ?', [re[0].flat_id, re[0].img])
                    if(re[0].img){
                        unlink("../../code/Static/flat/" + re[0].img, (e)=>{
                            res.status(200).json({ status: "Видалення було успішне" });
                        })
                    }else{
                        res.status(200).json({ status: "Видалення було успішне" }); 
                    }                        
                }
            })
        }else{
            res.status(200).json({ status: "Не співпало ID квартири з користувачем" });
        }       
    }


}
