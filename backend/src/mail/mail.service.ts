import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import sendMail from 'src/email';

@Injectable()
export class MailService {


    // Зміна почти
    async sendmailChangeCode(inf: any, res: any): Promise<any> {
        conee.query('SELECT * FROM users WHERE email = ? AND password = ?;',[inf.auth.email, inf.auth.password],
            (_err, results) => {
                if (results[0] !== undefined ) { 
                    conee.query('SELECT * FROM users WHERE email = ?;',[inf.newRegEmail],
                    (_err, resu) => {
                    if (resu[0] === undefined ) {
                        conee.query('DELETE FROM use_security WHERE email = ?  AND check_name = change_mail;', [results[0].email])
                        let numb = Math.floor(Math.random()*1000000)
                        let numb1 = Math.floor(Math.random()*1000000)
                        const html = `<p>Служба безпеки Discusio</p><h1 style="color: blue;">Ваш код: ${numb}</h1>`;
                        const html1 = `<p>Служба безпеки Discusio</p><h1 style="color: blue;">Ваш код: ${numb1}</h1>`;
                        conee.query('INSERT INTO use_security (firstName, email, new_email, password, em_pass, new_em_pass, attempt_counter, check_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                            [inf.userName, inf.regEmail, inf.newRegEmail, inf.regPassword, numb, numb1, 0, "change_mail"],
                            (err, result) => {
                                sendMail(html, inf.regEmail)
                                sendMail(html1, inf.newRegEmail)
                                res.status(200).json({ status: "На ваші дві пошти було надіслано код безпеки"});
                        }
                    )
                    }})       
                }else{
                    res.status(200).json({ status: "Ви не були авторизовані"});
                }
            }
        )
    }

    async getmailChangeCode(inf: any, res: any): Promise<any> {
        conee.query('SELECT * FROM users WHERE email = ? AND password = ?;',[inf.auth.email, inf.auth.password],
            (_err, results) => {
                if (results[0] !== undefined ) {  
                    conee.query('SELECT * FROM use_security WHERE email = ? AND em_pass = ? AND new_em_pass = ? AND check_name = change_mail;',[inf.auth.email, inf.pass, inf.new_pass],
                    (e, r)=>{
                        if(r !== undefined){
                            conee.query('DELETE FROM use_security WHERE email = ? AND check_name = change_mail;', [results[0].email]);
                            conee.query("UPDATE users SET email = ?, user_id = ? WHERE user_id = ?",
                            [r[0].new_email, r[0].new_email, results[0].email]);
                            conee.query('UPDATE contacts SET user_id = ?', [r[0].new_email]);
                            res.status(200).json({ status: "Пошта змінена" });
                        }
                    })                    
                }else{
                    res.status(200).json({ status: "Не правильний код"});
                }
            }
        )
    }



    // Видалення аккаунту
    async getDeleteAkkCode(inf: any, res: any): Promise<any> {
        conee.query('SELECT * FROM users WHERE email = ? AND password = ?;',[inf.auth.email, inf.auth.password],
        (_err, results) => {
            if (results[0] !== undefined ) {
                conee.query('SELECT * FROM use_security WHERE email = ? AND em_pass = ? AND password = ? AND check_name = delete_akk;',[inf.auth.email, inf.pass, inf.auth.password],
                    (errrrr, r)=>{
                        if(r !== undefined){
                            conee.query('DELETE FROM use_security WHERE email = ? AND check_name = delete_akk;', [results[0].email])
                            conee.query('SELECT flat_id FROM flat WHERE owner_id = ?', [results[0].user_id],
                            (_err, flat_ids: Array<any>) => {
                                flat_ids.forEach(e => {
                                    conee.query('DELETE FROM comunal WHERE flat_id = ?;', [e.flat_id])
                                    conee.query('DELETE FROM comunal_name WHERE flat_id = ?;', [e.flat_id])
                                    conee.query('DELETE FROM about WHERE flat_id = ?', [e.flat_id])
                                    conee.query('DELETE FROM parametrs WHERE flat_id = ?', [e.flat_id])
                                    conee.query('DELETE FROM flat_img WHERE flat_id = ?', [e.flat_id])
                                    conee.query('DELETE FROM flat WHERE flat_id = ?', [e.flat_id])
                                });
                            })                            
                            conee.query('DELETE FROM contacts WHERE user_id = ?;', [results[0].user_id])
                            conee.query('DELETE FROM user_img WHERE user_id = ?;', [results[0].user_id])
                            conee.query('DELETE FROM users WHERE user_id = ?;', [results[0].user_id])
                        }else{
                            res.status(200).json({ status: "Ви не правильно ввели еиайл або код або пароль"});
                        }


                    })         
            }else{
                res.status(200).json({ status: "Ви не були авторизовані"});
            }
        }
        )
    }
    
    async sendDeleteAkkCode(inf: any, res: any): Promise<any> {
        conee.query('SELECT * FROM users WHERE email = ? AND password = ?;',[inf.auth.email, inf.auth.password],
        (_err, results) => {
            if (results[0] !== undefined ) {
                    conee.query('DELETE FROM use_security WHERE email = ? AND check_name = delete_akk;', [results[0].email])
                    let numb = Math.floor(Math.random()*1000000)
                    const html = `<p>Служба безпеки Discusio</p><h1 style="color: blue;">Ваш код для видалення аккаунту: ${numb}</h1>`;
                    conee.query('INSERT INTO use_security (email, password, em_pass, attempt_counter, check_name) VALUES (?, ?, ?, ?, ?)',
                        [results[0].email, inf.regPassword, numb, 0, "delete_akk"],
                        (err, result) => {
                            sendMail(html, results[0].email)
                            res.status(200).json({ status: "На ваші дві пошти було надіслано код безпеки"});
                    }
                )         
            }else{
                res.status(200).json({ status: "Ви не були авторизовані"});
            }
        }
        )
    }


    // Забули пароль
    async getForgotPassCode(inf: any, res: any): Promise<any> {
        conee.query('SELECT * FROM use_security WHERE email = ? AND em_pass = ? AND check_name = forg_pass;',[inf.auth.email, inf.pass],
        (e, r)=>{
            if(r !== undefined){
                conee.query('DELETE FROM use_security WHERE email = ? AND check_name = forg_pass;', [inf.auth.email]);
                conee.query("UPDATE users SET password = ? WHERE user_id = ?",
                [inf.pass, inf.email]);
                res.status(200).json({ status: "Пароль змінено" });
            }
        })                   
    }
            
    async sendForgotPassCode(inf: any, res: any): Promise<any> {

        conee.query('DELETE FROM use_security WHERE email = ? AND check_name = forg_pass;', [inf.email])
        let numb = Math.floor(Math.random()*1000000)
        const html = `<p>Служба безпеки Discusio</p><h1 style="color: blue;">Ваш код для отримання паролю: ${numb}</h1>`;
        conee.query('INSERT INTO use_security (email, em_pass, attempt_counter, check_name) VALUES (?, ?, ?, ?)',
            [inf.email, numb, 0, "forg_pass"],
            (err, result) => {
                sendMail(html, inf.email)
                res.status(200).json({ status: "На ваші дві пошти було надіслано код безпеки"});
        })  
        
        
    }




}
