/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import sendMail from 'src/email';



@Injectable()
export class RegistrationService {

    async getRegister(inf: any, res: any): Promise<any> {
      if(inf.regEmail.indexOf("@discussio.beta") != -1){
        conee.query("SELECT COUNT(*) AS total FROM users",(er, re)=>{
          if(re[0].total <= 100){
            try{
              const startDate :any = new Date(inf.dob);
            const endDate :any  = new Date()
            const timeDifference = endDate - startDate;
            const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000;
            const yearsDifference = timeDifference / millisecondsInYear;
            if(inf.regEmail !== undefined && inf.regEmail !== null && inf.regPassword !== undefined && inf.regPassword !== null && yearsDifference >= 16){
              conee.query(
                'INSERT INTO users (firstName, user_mail, password, dob) VALUES (?, ?, ?, ?)',
                // eslint-disable-next-line prettier/prettier
                [inf.userName, inf.regEmail, inf.regPassword, startDate],
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (err, result:any) => {
                  // Додати до дениса
                if (err) {  
                  res.status(200).json({ status: "Не правильно передані данні" })
                }else{
                    conee.query('INSERT INTO contacts (user_id) VALUES (?)', [result.insertId])
                    conee.query('INSERT INTO features (user_id) VALUES (?)', [result.insertId])
                    conee.query('INSERT INTO user_parametrs (user_id) VALUES (?)', [result.insertId])
                  res.status(200).json({ status: true, email: inf.regEmail, password: inf.regPassword, userName: inf.userName});
                }  
                },
              );}else{
                res.status(200).json({ status: "Не правильно передані данні"});
            }
            }catch(err){
              res.status(200).json({ status: "Не правильно передані данні"});
            }
          }else{
            res.status(200).json({ status: "Перевищенноо ліміт користувачів на платформі"});
          }
        })
      }else{
        res.status(200).json({ status: "Не правильний ключ-пошта"});
      }
    }



    async firstRegistration(inf: any, res: any): Promise<any> {
      if(inf.regEmail !== undefined && inf.regEmail !== null && inf.regPassword !== undefined && inf.regPassword !== null){

        let numb = Math.floor(Math.random()*1000000)

        const html = `<p>Служба безпеки Discusio</p><h1 style="color: blue;">Ваш код: ${numb}</h1>`;

        conee.query(
          'INSERT INTO use_security (firstName, user_id, email, password, em_pass, attempt_counter) VALUES (?, ?, ?, ?, ?, ?)',
          // eslint-disable-next-line prettier/prettier
          [inf.userName, inf.regEmail, inf.regEmail, inf.regPassword, numb, 0],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (err, result) => {
            
            sendMail(html, inf.regEmail)
            res.status(200).json({ status: "На вашу пошту було надіслано код безпеки"});

          },
        );}else{
          res.status(200).json({ status: "Ви не ввели почту або пароль"});
      }
    }

    async finalRegistration(inf: any, res: any): Promise<any> {
      if(inf.regEmail !== undefined && inf.regEmail !== null && inf.code !== undefined && inf.code !== null){
        conee.query(
          'SELECT * FROM use_security WHERE email = ? AND em_pass = ?',
          // eslint-disable-next-line prettier/prettier
          [inf.regEmail, inf.code],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (err, result) => {
            if(result[0] !== undefined){
              conee.query(
                'INSERT INTO users (firstName, user_id, email, password) VALUES (?, ?, ?, ?)',
                // eslint-disable-next-line prettier/prettier
                [result[0].firstName, result[0].user_id, result[0].email, result[0].password],
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (err, result) => {
                  conee.query('INSERT INTO contacts (user_id) VALUES (?)', [result[0].user_id])
                  res.status(200).json({ status: true, email:  result[0].email, password: result[0].password, userName: result[0].firstName});
                },
              );
            }else{
              res.status(200).json({ status: "Не правильний код безпеки"});
            }
          },
        );}else{
          res.status(200).json({ status: "Ви не ввели код безпеки"});
      }
    }






}
