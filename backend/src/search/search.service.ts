/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';

@Injectable()
export class SearchService {
    constructor(private readonly appService: AppService) {}

    async getFlats(tok: any, res: any): Promise<any> {
        let query = 'SELECT';
        let params = [];
        let metod = " FROM flat JOIN parametrs ON flat.flat_id = parametrs.flat_id JOIN about ON flat.flat_id = about.flat_id WHERE rent = 1"
        const inf = " flat.flat_id, about.data, flat.country, flat.region, flat.city, flat.street, flat.houseNumber, flat.apartment, flat.flat_index, flat.distance_metro, flat.distance_stop, flat.distance_shop, flat.distance_green, flat.distance_parking, about.woman, about.man, about.family, about.students, about.animals, about.bunker, about.price_m, about.price_d, about.about, about.room, about.option_pay, parametrs.rooms, parametrs.repair_status, parametrs.area, parametrs.kitchen_area, parametrs.balcony, parametrs.floor, parametrs.option_flat";
        
        if (tok.flat_id) {
            metod += ' AND flat.flat_id = ?';
            params.push(tok.flat_id);
        }
        if (tok.option_flat) {
            metod += ' AND option_flat = ?';
            params.push(tok.option_flat);
        }
        if (tok.room) {
            metod += ' AND room = ?';
            params.push(tok.room);
        }

        // if (tok.room == 'true') {
        //     let a = true
        //     query += ' AND about.room = ?';
        //     params.push(a);
        // }else if(tok.room == 'false'){
        //     let a = false
        //     query += ' AND about.room = ?';
        //     params.push(a);
        // }

        if (tok.country) {
            metod += ' AND country = ?';
            params.push(tok.country);
        }
        if (tok.region) {
            metod += ' AND region = ?';
            params.push(tok.region);
        }
        if (tok.street) {
            metod += ' AND street = ?';
            params.push(tok.street);
        }
        if (tok.city) {
            metod += ' AND city = ?';
            params.push(tok.city);
        }

        if (tok.repair_status) {
            metod += ' AND repair_status = ?';
            params.push(tok.repair_status);
        }
        if (tok.kitchen_area) {
            metod += ' AND kitchen_area <= ?';
            params.push(tok.kitchen_area);
        }
        if (tok.balcony) {
            metod += ' AND balcony = ?';
            params.push(tok.balcony);
        }
        if (tok.floor) {
            metod += ' AND floor <= ?';
            params.push(tok.floor);
        }
        if (tok.bunker) {
            metod += ' AND bunker = ?';
            params.push(tok.bunker);
        }
        if (tok.distance_metro) {
            metod += ' AND distance_metro <= ?';
            params.push(tok.distance_metro);
        }
        if (tok.distance_stop) {
            metod += ' AND distance_stop <= ?';
            params.push(tok.distance_stop);
        }
        if (tok.distance_shop) {
            metod += ' AND distance_shop <= ?';
            params.push(tok.distance_shop);
        }
        if (tok.distance_green) {
            metod += ' AND distance_green <= ?';
            params.push(tok.distance_green);
        }
        if (tok.distance_parking) {
            metod += ' AND distance_parking <= ?';
            params.push(tok.distance_parking);
        }
        if (tok.woman) {
            metod += ' AND woman = ?';
            params.push(tok.woman);
        }
        if (tok.man) {
            metod += ' AND man = ?';
            params.push(tok.man);
        }
        if (tok.family) {
            metod += ' AND family = ?';
            params.push(tok.family);
        }
        if (tok.students) {
            metod += ' AND students = ?';
            params.push(tok.students);
        }
        if (tok.animals) {
            metod += ' AND animals = ?';
            params.push(tok.animals);
        }

        
        if (tok.option_pay) {
            metod += ' AND option_pay = ?';
            params.push(tok.option_pay);
        }
        if (tok.price_of) {
            metod += ' AND price_m >= ?';
            params.push(tok.price_of);
        }
        if (tok.price_to) {
            metod += ' AND price_m <= ?';
            params.push(tok.price_to);
        }





        if (tok.area_of) {
            metod += ' AND area >= ?';
            params.push(tok.area_of);
        }
        if (tok.area_to) {
            metod += ' AND area <= ?';
            params.push(tok.area_to);
        }        
        if (tok.rooms_of) {
            metod += ' AND rooms >= ?';
            params.push(tok.rooms_of);
        }
        if (tok.rooms_to) {
            metod += ' AND rooms <= ?';
            params.push(tok.rooms_to);
        }

        let countQuery = "SELECT COUNT(*) AS total" + metod
        const countParams = params.map((i)=>{
            return i
        })
        if(tok.filterData == "1"){
            metod +=  " ORDER BY about.price_m"
        }else if(tok.filterData == "2"){
            metod +=  " ORDER BY about.price_m DESC"
        }else if(tok.filterData == "3"){
            metod +=  " ORDER BY about.data DESC"
        }

        let n:any = Number(tok.limit)
        if(tok.limit === undefined){
            n = 0
        }
        metod += ' LIMIT 5 OFFSET ?';
        if (tok.limit !== undefined) {
            params.push(n);
        } else {
            params.push(0);
        }

        
        
        query += inf + metod;
        conee.query(query, params, async (_err, results: Array<any> | any) => {
            let count : any = await this.appService.countSearch(countQuery, countParams)

            let promises = []
            if (results !== undefined) {
                results.forEach((e: any) => {
                    let promise = new Promise((resolve, reject) => {
                        conee.query("SELECT * FROM flat_img WHERE flat_id = ?", [e.flat_id], (er, resq: Array<any> | any) => {
                            if (er) {
                                reject(er)
                            } else {
                                e.img = resq.map((i: any) => i.img)
                                resolve(e)
                            }
                        })
                    })
                    promises.push(promise)
                });
            }
            
            Promise.all(promises).then((img) => {
                res.status(200).json({img, count} );
            }).catch((error) => {
                res.status(500).json({ error: error.message });
            })
        })
        
    }


    async getUsers(tok: any, res: any): Promise<any> {
        let a = await this.appService.authentification(tok.auth)
        let fl = await this.appService.flatCheck(a.user_id, tok.flat_id)
        let admin = await this.appService.citizen(a.user_id, tok.flat_id)
        if((a && fl) || (a && admin.acces_subs)){
            let query = 'SELECT';
            let params = [];
            let metod = " FROM users JOIN features ON users.user_id = features.user_id JOIN user_img ON users.user_id = user_img.user_id WHERE features.agree_search = 1"
            const inf = " features.country, features.about, features.data, features.region, features.city, features.distance_metro, features.distance_stop, features.distance_shop, features.distance_green, features.distance_parking, features.woman, features.man, features.family, features.students, features.animals, features.bunker, features.option_pay, features.price_of, features.price_to, features.house, features.room, features.flat, features.agree_search, features.looking_woman, features.looking_man, features.rooms_of, features.rooms_to, features.repair_status, features.area_of, features.area_to, features.balcony, features.purpose_rent, features.days, features.weeks, features.mounths, features.years, features.day_counts, users.user_id, users.firstName, users.lastName, user_img.img";
            
    
            if (tok.user_id) {
                metod += ' AND features.user_id = ?';
                params.push(tok.user_id);
            }

            if (tok.purpose_rent) {
                metod += ' AND features.purpose_rent = ?';
                params.push(tok.purpose_rent);
            }
            
            if (tok.country) {
                metod += ' AND features.country = ?';
                params.push(tok.country);
            }
            
            if (tok.region) {
                metod += ' AND features.region = ?';
                params.push(tok.region);
            }
            
            if (tok.city) {
                metod += ' AND features.city = ?';
                params.push(tok.city);
            }
            
            if (tok.distance_metro) {
                metod += ' AND features.distance_metro <= ?';
                params.push(tok.distance_metro);
            }
            
            if (tok.distance_stop) {
                metod += ' AND features.distance_stop <= ?';
                params.push(tok.distance_stop);
            }
            
            if (tok.distance_shop) {
                metod += ' AND features.distance_shop <= ?';
                params.push(tok.distance_shop);
            }
            
            if (tok.distance_green) {
                metod += ' AND features.distance_green <= ?';
                params.push(tok.distance_green);
            }
            
            if (tok.distance_parking) {
                metod += ' AND features.distance_parking <= ?';
                params.push(tok.distance_parking);
            }
            
            if (tok.woman === false) {
                metod += ' AND features.woman = ?';
                params.push(false);
            }
            
            if (tok.man === false) {
                metod += ' AND features.man = ?';
                params.push(false);
            }
            
            if (tok.family === false) {
                metod += ' AND features.family = ?';
                params.push(false);
            }
            
            if (tok.students === false) {
                metod += ' AND features.students = ?';
                params.push(false);
            }
            
            
            if (tok.animals) {
                metod += ' AND features.animals = ?';
                params.push(tok.animals);
            }
            
            if (tok.bunker) {
                metod += ' AND features.bunker = ?';
                params.push(tok.bunker);
            }
            
            if (tok.option_pay != undefined) {
                metod += ' AND features.option_pay = ?';
                params.push(tok.option_pay);
            }
            // Чекати інпату Дениса
            if (tok.price) {
                metod += ' AND features.price_of <= ? AND features.price_to >= ?';
                params.push(tok.price);
                params.push(tok.price);
            }
            // 
    
    
            if (tok.house == 1) {
                metod += ' AND features.house = ?';
                params.push(tok.house);
            }
            
            if (tok.room == 1) {
                metod += ' AND features.room = ?';
                params.push(tok.room);
            }
            
            if (tok.flat == 1) {
                metod += ' AND features.flat = ?';
                params.push(tok.flat);
            }
                    
            if (tok.looking_woman) {
                metod += ' AND features.looking_woman = ?';
                params.push(tok.looking_woman);
            }
            
            if (tok.looking_man) {
                metod += ' AND features.looking_man = ?';
                params.push(tok.looking_man);
            }
            
            // Чекати інпати Дениса
            if (tok.rooms) {
                metod += ' AND features.rooms_of <= ? AND features.rooms_to >= ?';
                params.push(tok.rooms);
                params.push(tok.rooms);
            }
            // 
            
            if (tok.repair_status) {
                metod += ' AND features.repair_status = ?';
                params.push(tok.repair_status);
            }
            
            // Чекати інпати Дениса
            if (tok.area) {
                metod += ' AND features.area_of <= ? AND features.area_to >= ?';
                params.push(tok.area);
                params.push(tok.area);
            }
            // 
            
            if (tok.balcony) {
                metod += ' AND features.balcony = ?';
                params.push(tok.balcony);
            }
            
            
            let days = Number(tok.day_counts)
            if (days < 14 && days !== 0) {
                metod += ' AND features.day_counts = ?';
                params.push(days);
            }else if(days >= 14 && days < 30){
                let a = days - 5
                let b = days + 5
                metod += ' AND features.day_counts >= ? AND features.day_counts <= ?';
                params.push(a);
                params.push(b);
            }else if(days >= 30 && days < 60){
                let a = days - 10
                let b = days + 10
                metod += ' AND features.day_counts >= ? AND features.day_counts <= ?';
                params.push(a);
                params.push(b);
            }else if(days >= 60 && days <= 120){
                let a = days - 20
                let b = days + 20
                metod += ' AND features.day_counts >= ? AND features.day_counts <= ?';
                params.push(a);
                params.push(b);
            }else if(days >= 120 && days < 365){
                let a = days - 30
                let b = days + 30
                metod += ' AND features.day_counts >= ? AND features.day_counts <= ?';
                params.push(a);
                params.push(b);
            }else if(days >= 365){
                metod += ' AND features.day_counts >= ?';
                params.push(days);
            }

            let countQuery = "SELECT COUNT(*) AS total" + metod
            let countParams = params.map((i)=>{
                return i
            })

            if(tok.filterData == ""){
            }else if(tok.filterData == "3"){
                metod +=  " ORDER BY features.data DESC"
            }
            
    
            let n:any = Number(tok.limit)
            metod += ' LIMIT 5 OFFSET ?';
            if (tok.limit !== undefined) {
                params.push(n);
            } else {
                params.push(0);
            }

            

            query += inf + metod;
    
            conee.query(query, params, async (_err, results: Array<any> | any) => {
                let count : any = await this.appService.countSearch(countQuery, countParams)
                res.status(200).json({ user_inf: results, status:true, search_count: count });
            }) 
    
        }else{
            res.status(200).json({ status: false });
        }

    }

}
