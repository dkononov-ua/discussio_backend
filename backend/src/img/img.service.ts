/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { rename, unlink } from 'fs';
import { RowDataPacket } from 'mysql2';
import { AppService } from 'src/app.service';
import * as sharp from 'sharp';

@Injectable()
export class ImgService {
    constructor(private readonly appService: AppService) {}

    async saveImgF(files: any, inf: any, res: any) {
        const i = JSON.parse(inf.auth)
        let a = await this.appService.authentification(i)
        let fl = await this.appService.flatCheck(a.user_id, inf.flat_id)
        if(a && fl){
            const type_file = '.' + files.mimetype.split('/')[1]
                    conee.query("INSERT INTO flat_img (flat_id, img) VALUES (?, ?)", [inf.flat_id, files.filename + type_file],(err, resuuuu)=>{
                        if (err) {  
                            unlink("../../code/Static/" + files.filename, () => {
                                res.status(200).json({ status: "Ви не пройшли авторизацію" });
                            })
                        }else{
                            rename("../../code/Static/" + files.filename, "../../code/Static/flat/" + files.filename + type_file, (err) => { })
                            conee.query('SELECT * FROM flat_img WHERE flat_id = ?;', [inf.flat_id], (er, re: RowDataPacket[]) => {
                            if (re.length >= 7) {
                                conee.query('DELETE FROM flat_img WHERE img = ?', [re[0].img])
                                unlink("../../code/Static/flat/" + re[0].img, () => { })
                            }
                            })
                            res.status(200).json({ status: "Фото квартири успішно збережене" });                            
                        }
                    })      
        }else{
            unlink("../../code/Static/" + files.filename, () => {
                res.status(200).json({ status: "Ви не пройшли авторизацію" });
            })
        }
    }



    async sa(files: any, inf: any, res: any) {
        // const i = JSON.parse(inf.auth!)
        const type_file = '.' + files.mimetype.split('/')[1]
        rename("../../code/Static/" + files.filename, "../../code/Static/flat/" + files.filename + type_file, (err) => { })
        res.status(200).json({ status: "Фото квартири успішно збережене" });
    }


    async saveImgU(files: any, inf: any, res: any) {
        const i = JSON.parse(inf.auth)
        let a = await this.appService.authentification(i)
        if(a){
            const type_file = '.' + files.mimetype.split('/')[1]
                conee.query('SELECT * FROM user_img WHERE user_id = ?;', [a.user_id], (er, re) => {
                    if(re[0] !== undefined){
                        conee.query('DELETE FROM user_img WHERE img = ?', [re[0].img])
                        unlink("../../code/Static/users/" + re[0].img, (e)=>{console.log(e)})
                    }
                        conee.query("INSERT INTO user_img (user_id, img) VALUES (?, ?)", [a.user_id, files.filename + type_file])
                        rename("../../code/Static/" + files.filename, "../../code/Static/users/" + files.filename + type_file, (err) => { })
                        res.status(200).json({ status: "Фото квартири успішно збережене" });
                })
        }else{
            unlink("../../code/Static/" + files.filename, () => {
                res.status(200).json({ status: "Ви не пройшли авторизацію" });
            })
        }       
    }





    async saveImgFilling(files: any, inf: any, res: any) {

        const i = JSON.parse(inf.auth)
        let b = JSON.parse(inf.inf)

        let a = await this.appService.authentification(i)
        let fl = await this.appService.flatCheck(a.user_id, b.flat_id)
        let admin = await this.appService.citizen(a.user_id, b.flat_id)

        if((a && fl && files) || (a && admin.acces_filling && files)){
            const type_file = '.' + files.mimetype.split('/')[1]
                    rename("../../code/Static/" + files.filename, "../../code/Static/" + files.filename + type_file, (err) => {
                        const inputFile = "../../code/Static/" + files.filename + type_file;
                        const outputFile = "../../code/Static/filling/" + files.filename + type_file;
                    // Визначте нові розміри для зображення (наприклад, зменшити розмір удвічі)
                        const newWidth = 400; // нова ширина
                        const newHeight = 400; // нова висота
                    // Використовуйте sharp для зміни розміру зображення
                        sharp(inputFile).resize(newWidth, newHeight)
                        .toFile(outputFile)
                        .then(() => {
                            console.log([b.flat_id, files.filename + type_file, b.about_filling, b.name_filling, b.type_filling, b.number_filling, b.condition_filling])
                            conee.query("INSERT INTO filling (flat_id, img, about_filling, name_filling, type_filling, number_filling, condition_filling) VALUES (?, ?, ?, ?, ?, ?, ?)", [b.flat_id, files.filename + type_file, b.about_filling, b.name_filling, b.type_filling, b.number_filling, b.condition_filling],
                            (errr)=>{
                                if(errr){
                                    unlink(inputFile, () => {})
                                    unlink(outputFile, () => {})
                                    res.status(200).json({ status: "Фото квартири неуспішно збережене" });
                            }else{
                                unlink(inputFile, () => {})
                                res.status(200).json({ status: "Фото квартири успішно збережене" });}
                            })
                            
                        })
                        .catch((err) => {
                            unlink("../../code/Static/" + files.filename + type_file, () => {})
                          console.error('Помилка при зміні розміру зображення:', err);
                        });
                     })
                    // rename("../../Static/" + files.filename, "../../Static/users/" + files.filename + type_file, (err) => { })
        }else if((a && fl) || (a && admin.acces_filling)){
            conee.query("INSERT INTO filling (flat_id, about_filling, name_filling, type_filling, number_filling, condition_filling) VALUES (?, ?, ?, ?, ?, ?)", [b.flat_id, b.about_filling, b.name_filling, b.type_filling, b.number_filling, b.condition_filling],
            (errr)=>{
                if(errr){
                    res.status(200).json({ status: "Наповнення неуспішно збережено" });
            }else{
                res.status(200).json({ status: "Наповнення успішно збережено" });}
            })
        }else{
            try{
                unlink("../../code/Static/" + files.filename, () => {
                    res.status(200).json({ status: "Ви не пройшли авторизацію" });
                })
            }catch(err){
                throw err
            }
        }       
    }






}