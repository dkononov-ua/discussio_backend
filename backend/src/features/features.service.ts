/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';

@Injectable()
export class FeaturesService {
    constructor(private readonly appService: AppService) {}

    async getFeatures(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            conee.query("SELECT * FROM features WHERE user_id = ?",
                [a.user_id],
                (err, resuuuu)=>{
                    if (err) {  
                        res.status(200).json({ status: "Не правильно передані данні" })
                    }else{
                        res.status(200).json({ status: true, inf:resuuuu[0] });                            
                    }
                })
        }else{
            res.status(200).json({ status: false });
        }
    }

    
    async addFeatures(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        if(a){
            conee.query("UPDATE features SET country = ?, region = ?, city = ?, distance_metro = ?, distance_stop = ?, distance_shop = ?, distance_green = ?, distance_parking = ?, woman = ?, man = ?, family = ?, students = ?, animals = ?, bunker = ?, option_pay = ?, price_of = ?, price_to = ?, house = ?, room = ?, flat = ?, agree_search = ?, looking_woman = ?, looking_man = ?, rooms_of = ?, rooms_to = ?, repair_status = ?, area_of = ?, area_to = ?, balcony = ?, purpose_rent = ?, days = ?, weeks = ?, mounths = ?, years = ?, day_counts = ?, data = ?, about = ? WHERE user_id = ?",
            [tok.new.country, tok.new.region, tok.new.city, tok.new.distance_metro,
                tok.new.distance_stop, tok.new.distance_shop, tok.new.distance_green,
                tok.new.distance_parking, tok.new.woman, tok.new.man, tok.new.family,
                tok.new.students, tok.new.animals, tok.new.bunker, tok.new.option_pay,
                tok.new.price_of, tok.new.price_to, tok.new.house, tok.new.room,
                tok.new.flat, tok.new.agree_search, tok.new.looking_woman,
                tok.new.looking_man, tok.new.rooms_of, tok.new.rooms_to,
                tok.new.repair_status, tok.new.area_of, tok.new.area_to,
                tok.new.balcony, tok.new.purpose_rent, tok.new.days, tok.new.weeks,
                tok.new.mounths, tok.new.years, tok.new.day_counts, new Date(), tok.new.about, a.user_id],
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
