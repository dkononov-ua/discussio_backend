import { Controller, Post, Response, Body, Get, UseInterceptors, UploadedFile, Res, Param } from '@nestjs/common';
import * as mmm from 'mysql2/promise'
import conee from './db';

import { AppService } from './app.service';
// import authentification from './sqlfunc/auth';





// const a = mmm.createConnection(
//   {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'y4kQuRF<ct?O0',
//     insecureAuth: true,
//     database: 'users9000',

// }
// )

// const storage = dStorage.diskStorage({
//   destination: './Static',
//   filename: (req, file, cb) => {
//     const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
//     return cb(null, `${randomName}${extname(file.originalname)}`)
//   },
// })

@Controller('changeeeeeeeeeee')
export class AppController {
  constructor(private readonly appService: AppService) {}


  // @Post()
  // // eslint-disable-next-line @typescript-eslint/ban-types
  // async changeComunal(@Response() res, @Body() inf: any): Promise<any> {


  //   res.status(200).json({ status: await authentification(inf)});
  // }

  // @Post('wqeqw')
  // // eslint-disable-next-line @typescript-eslint/ban-types
  // async changeComunall(@Response() res, @Body() inf: any): Promise<any> {
  //   console.log(inf)
  //   conee.query(
  //     'INSERT INTO users (firstName, user_id, email, password) VALUES (?, ?, ?, ?)',
  //     // eslint-disable-next-line prettier/prettier
  //     [inf.userName, inf.regEmail, inf.regEmail, inf.regPassword],
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     (err, result) => {
  //       console.log(err)
  //       // Додати до дениса
  //     if (err) {  
  //       res.status(200).json({ status: "Не правильно передані данні" })
  //     }else{
  //       conee.query('INSERT INTO contacts (user_id) VALUES (?)', [inf.regEmail])
  //       res.status(200).json({ status: true, email: inf.regEmail, password: inf.regPassword, userName: inf.userName});
  //     }  
  //     })


  // }


  // @Post('12')
  // // eslint-disable-next-line @typescript-eslint/ban-types
  // async getRegister(@Response() res, @Body() tok: Object): Promise<any> {





  //   console.log(tok)
  //   res.status(200).json({ status: "Не правильно передані данні" })
  // }

}
