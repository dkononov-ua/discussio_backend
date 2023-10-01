/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from './db';
// import conect from './sqlfunc/db';
import * as mm from 'mysql2/promise'

const config = {
  host: 'mysql',
  user: 'root',
  password: 'discuss32144',
  insecureAuth: true,
  database: "disscussio_beta_1",
}



const conect = mm.createConnection(config)



@Injectable()
export class AppService {

  async getFlatNames(flat_ids: any){
    let b = []
    await Promise.all(flat_ids.map(async(i :any) => {
      let [rows, fields] = await (await conect).execute("SELECT flat_id, flat_name FROM flat WHERE flat_id = ? LIMIT 1", [i.flat_id]);
      i.flat_name =  rows[0].flat_name
      b.push(i)
    }))
    if (b) {
      return b
    } else {
      return false
    }
  }


  async countSearch(query: string, params : any){
    let [rows, fields] = await (await conect).execute(query, params)
    if (rows[0] !== undefined) {
      return rows[0].total
    } else {
      return false
    }
  }


  async countYUserSubs(user_id: string){
    let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS total FROM user_subscribes WHERE user_id = ?", [user_id])
    if (rows[0] !== undefined) {
      return rows[0].total
    } else {
      return false
    }
  }

  async countUserSubs(flat_id: string){
    let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS total FROM user_subscribes WHERE flat_id = ?", [flat_id])
    if (rows[0] !== undefined) {
      return rows[0].total
    } else {
      return false
    }
  }


  async countYSubs(user_id: string){
    let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS total FROM subscribes WHERE user_id = ?", [user_id])
    if (rows[0] !== undefined) {
      return rows[0].total
    } else {
      return false
    }
  }

  async countSubs(flat_id: string){
    let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS total FROM subscribes WHERE flat_id = ?", [flat_id])
    if (rows[0] !== undefined) {
      return rows[0].total
    } else {
      return false
    }
  }

  async countDisc(user_id: string){
    let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS total FROM accept_subs WHERE user_id = ?", [user_id])
    if (rows[0] !== undefined) {
      return rows[0].total
    } else {
      return false
    }
  }

  async countYdisc(flat_id: string){
    let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS total FROM accept_subs WHERE flat_id = ?", [flat_id])
    if (rows[0] !== undefined) {
      return rows[0].total
    } else {
      return false
    }
  }


  async countCitizen(user_id: string){
    let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS total FROM citizen WHERE user_id = ?", [user_id])
    if (rows[0] !== undefined) {
      return rows[0].total
    } else {
      return false
    }
  }

  async countYCitizen(flat_id: string){
    let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS total FROM citizen WHERE flat_id = ?", [flat_id])
    if (rows[0] !== undefined) {
      return rows[0].total
    } else {
      return false
    }
  }

  async countagree(user_id: string){
    let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS total FROM agreement WHERE subscriber_id = ? AND i_agree IS NULL", [user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }

  async getChatsFlat(flat_id: string, offs : string){
    let [rows, fields]: [any, any] = await (await conect).execute('SELECT * FROM chat WHERE flat_id = ? ORDER BY data DESC LIMIT 20 OFFSET ?;', [flat_id, offs.toString()])
    let a = await Promise.all(rows.map(async(i:any)=>{
      let [rows2, fields2] = await (await conect).execute("SELECT COUNT(*) AS unread_count FROM message WHERE user_id = ? AND is_read = false AND chat_id = ?", [ i.user_id, i.chat_id]);
      let [rows3, fields3] = await (await conect).execute("SELECT flat_name FROM flat WHERE flat_id = ? LIMIT 1", [i.flat_id]);

      return{flat_id:i.flat_id, user_id:i.user_id, chat_id:i.chat_id, unread:rows2[0].unread_count, last_message: i.message, flat_name:rows3[0].flat_name}
    }))
    if (rows[0] !== undefined) {
      return a
    } else {
      return false
    }
  }


  async getChatsUser(user_id: string, offs : string){
    let [rows, fields]: [any, any] = await (await conect).execute('SELECT * FROM chat WHERE user_id = ? ORDER BY data DESC LIMIT 20 OFFSET ?;', [user_id, offs.toString()])
    let a = await Promise.all(rows.map(async(i:any)=>{
      let [rows2, fields2] = await (await conect).execute("SELECT COUNT(*) AS unread_count FROM message WHERE flat_id = ? AND is_read = false AND chat_id = ?", [ i.flat_id, i.chat_id]);
      let [rows3, fields3] = await (await conect).execute("SELECT flat_name FROM flat WHERE flat_id = ? LIMIT 1", [i.flat_id]);

      return{flat_id:i.flat_id, user_id:i.user_id, chat_id:i.chat_id, unread:rows2[0].unread_count, last_message: i.message, flat_name:rows3[0].flat_name}
    }))
    if (rows[0] !== undefined) {
      return a
    } else {
      return false
    }
  }

  async getChat(flat_id: string, user_id : string){
    let [rows, fields] = await (await conect).execute('SELECT * FROM chat WHERE flat_id = ? AND user_id = ?;', [flat_id, user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }

  async addChat(flat_id: string, user_id : string){
    try{
      var random = Math.floor(Math.random() * 9000000000) + 1000000000;
      conee.query("INSERT INTO chat_name (chat_id) VALUES (?);", [flat_id + user_id + random],(e)=>{});
      conee.query("INSERT INTO chat (flat_id, user_id, chat_id) VALUES (?, ?, ?);", [flat_id, user_id, flat_id + user_id + random],(e)=>{});      
      return true
    }catch{
      return false
    }
  }

  async readMessageFlat( user_id : string, chat_id: string){
    try{
      conee.query('UPDATE message SET is_read = ? WHERE user_id = ? AND chat_id = ? AND is_read = false;', [true, user_id, chat_id],(e)=>{});
      return true
    }catch{
      return false
    }
  }

  async sendMessageFlat( user_id : string, flat_id: string, chat_id: string, message: string){
      try{
        let d = new Date()
        conee.query("UPDATE chat SET message = ?, data = ? WHERE chat_id = ?;", [message, d, chat_id],(e)=>{});
        conee.query("INSERT INTO message (sender_id, flat_id, chat_id, message, data) VALUES (?, ?, ?, ?, ?);", [user_id, flat_id, chat_id, message, d],(e)=>{});
        return true
      }catch{
        return false
      }
  }

  async readMessageUser( flat_id : string, chat_id: string){
    try{
      conee.query('UPDATE message SET is_read = ? WHERE flat_id = ? AND chat_id = ? AND is_read = false;', [true, flat_id, chat_id],(e)=>{});
      return true
    }catch{
      return false
    }
  }

  async sendMessageUser(user_id : string, chat_id: string, message: string){
      try{
        let d = new Date()
        conee.query("UPDATE chat SET message = ?, data = ? WHERE chat_id = ?;", [message, d, chat_id],(e)=>{})
        conee.query("INSERT INTO message (user_id, chat_id, message, data) VALUES (?, ?, ?, ?);", [user_id, chat_id, message, d],(e)=>{});
        return true
      }catch{
        return false
      }
  }


  async getNewmessage(chat_id: string, data: Date, offs : string){
    const startDate = new Date(data);
    let [rows, fields] = await (await conect).execute("SELECT flat_id, user_id, chat_id, message, data, is_read, sender_id FROM message WHERE chat_id = ? AND data > ? ORDER BY data DESC LIMIT 50 OFFSET ?",
     [chat_id, startDate, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return false
    }
  }

  async getmessage(chat_id: string, offs : string){
    let [rows, fields] = await (await conect).execute("SELECT flat_id, user_id, chat_id, message, data, sender_id, is_read FROM message WHERE chat_id = ? AND is_read = true ORDER BY data DESC LIMIT 50 OFFSET ?",
     [chat_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return false
    }
  }

  async dontReadMessageFlat(flat_id: string){
    let [r]: [any, any] = await (await conect).execute('SELECT * FROM chat WHERE flat_id = ?;', [flat_id])
    let a = 0
    if(r[0] !== undefined){
    await Promise.all(r.map(async(i :any) => {
      let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS unread_count FROM message WHERE chat_id = ? AND user_id = ? AND is_read = FALSE", [i.chat_id ,i.user_id]);
      a += rows[0].unread_count
    }))
    }
    if(a != 0){
      return a
    }else{
      return false
    }   
  }

  async dontReadMessageUser(user_id : string){
    let [r]: [any, any] = await (await conect).execute('SELECT * FROM chat WHERE user_id = ?;', [user_id])
    let a = 0
    if(r[0] !== undefined){
    await Promise.all(r.map(async(i :any) => {
      let [rows, fields] = await (await conect).execute("SELECT COUNT(*) AS unread_count FROM message WHERE chat_id = ? AND flat_id = ? AND is_read = FALSE", [i.chat_id, i.flat_id]);
      a += rows[0].unread_count
    }))
    }
    if(a != 0){
      return a
    }else{
      return false
    } 
  }


  async agent(flat_id: string){
    let [rows, fields] = await (await conect).execute('SELECT * FROM citizen WHERE flat_id = ? AND acces_agent = TRUE;', [flat_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }

  async getUserParams(user_id: string) {
    let [rows, fields]:[Array<any> | any, any] = await (await conect).execute(`SELECT user_id, add_in_flat FROM user_parametrs WHERE user_id = ? LIMIT 1`, [user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return  false 
    }
  }


  async getUserSaveAgreement(flat_id: string, user_id: string) {
    let [rows, fields]:[Array<any> | any, any] = await (await conect).execute(`SELECT flat_id, subscriber_id, owner_id
    FROM agreement WHERE flat_id = ? AND i_agree = true AND subscriber_id = ? LIMIT 1`, [flat_id, user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return  false 
    }
  }


  async getAllSaveAgreement(flat_id: string, offs: string) {
    let [rows, fields]:[Array<any> | any, any] = await (await conect).execute(`SELECT DISTINCT flat_id, agreement_id, subscriber_id, subscriber_firstName, subscriber_lastName, subscriber_surName, subscriber_email,
    subscriber_tell,  owner_id, owner_firstName, owner_lastName,  owner_surName, owner_email,
    owner_tell, flat_id, agreementDate, city, street, houseNumber,
    apartment, rent_due_data, penalty, ownership, dateAgreeStart, dateAgreeEnd, transferHouse, whoPayComun, depositPayment, dateAgreeBreakUp, numberVisits, personsReside, vacateHouse,
    max_penalty, price, area, subscriber_img, owner_img, option_flat, room, floor, about_agree FROM agreement WHERE flat_id = ? AND i_agree = true LIMIT 10 OFFSET ?`, [flat_id, offs.toString()])
    if (rows[0] !== undefined) {
      return await Promise.all(rows.map(async (e) => {
        let [img, fie]: [Array<any> | any, any] = await (await conect).execute("SELECT * FROM flat_img WHERE flat_id = ?", [e.flat_id])
        // let[agent_id, ff] :[ Array<any> | any, any] = await (await conect).execute("SELECT agent_id FROM flat WHERE flat_id = ?", [flat_id])
        if (img) {
          return { flat: e, img: await Promise.all(img.map((i: any) => i.img))}
        } else {
          return e
        }
      }))
    } else {
      return  false 
    }
  }

  async getAllSaveYAgreement(user_id: string, offs: string) {
    let [rows, fields]:[Array<any> | any, any] = await (await conect).execute(`SELECT DISTINCT flat_id, agreement_id, subscriber_id, subscriber_firstName, subscriber_lastName, subscriber_surName, subscriber_email,
    subscriber_tell,  owner_id, owner_firstName, owner_lastName,  owner_surName, owner_email,
    owner_tell, flat_id, agreementDate, city, street, houseNumber,
    apartment, rent_due_data, penalty, ownership, dateAgreeStart, dateAgreeEnd, transferHouse, whoPayComun, depositPayment, dateAgreeBreakUp, numberVisits, personsReside, vacateHouse,
    max_penalty, price, area, subscriber_img, owner_img, option_flat, room, floor, about_agree FROM agreement WHERE subscriber_id = ? AND i_agree = true LIMIT 10 OFFSET ?`, [user_id, offs.toString()])
    if (rows[0] !== undefined) {
      return await Promise.all(rows.map(async (e) => {
        let [img, fie]: [Array<any> | any, any] = await (await conect).execute("SELECT * FROM flat_img WHERE flat_id = ?", [e.flat_id])
        // let[agent_id, ff] :[ Array<any> | any, any] = await (await conect).execute("SELECT agent_id FROM flat WHERE flat_id = ?", [flat_id])
        if (img) {
          return { flat: e, img: await Promise.all(img.map((i: any) => i.img))}
        } else {
          return e
        }
      }))
    } else {
      return false
    }
  }

  async getAllAgreement(flat_id: string, offs: string) {
    let [rows, fields]:[Array<any> | any, any] = await (await conect).execute(`SELECT DISTINCT flat_id, agreement_id, subscriber_id, subscriber_firstName, subscriber_lastName, subscriber_surName, subscriber_email,
    subscriber_tell,  owner_id, owner_firstName, owner_lastName,  owner_surName, owner_email,
    owner_tell, flat_id, agreementDate, city, street, houseNumber,
    apartment, rent_due_data, penalty, ownership, dateAgreeStart, dateAgreeEnd, transferHouse, whoPayComun, depositPayment, dateAgreeBreakUp, numberVisits, personsReside, vacateHouse,
    max_penalty, price, area, subscriber_img, owner_img, i_agree, option_flat, room, floor, about_agree FROM agreement WHERE flat_id = ? AND i_agree IS NULL LIMIT 10 OFFSET ?`, [flat_id, offs.toString()])
    if (rows[0] !== undefined) {

      return await Promise.all(rows.map(async (e) => {
        let [img, fie]: [Array<any> | any, any] = await (await conect).execute("SELECT * FROM flat_img WHERE flat_id = ?", [e.flat_id])
        // let[agent_id, ff] :[ Array<any> | any, any] = await (await conect).execute("SELECT agent_id FROM flat WHERE flat_id = ?", [flat_id])
        if (img) {
          return { flat: e, img: await Promise.all(img.map((i: any) => i.img))}
        } else {
          return e
        }
      }))
    } else {
      return  false 
    }
  }

  async getAllYAgreement(user_id: string, offs: string) {
    let [rows, fields]:[Array<any> | any, any] = await (await conect).execute(`SELECT DISTINCT flat_id, agreement_id, subscriber_id, subscriber_firstName, subscriber_lastName, subscriber_surName, subscriber_email,
    subscriber_tell,  owner_id, owner_firstName, owner_lastName,  owner_surName, owner_email,
    owner_tell, flat_id, agreementDate, city, street, houseNumber,
    apartment, rent_due_data, penalty, ownership, dateAgreeStart, dateAgreeEnd, transferHouse, whoPayComun, depositPayment, dateAgreeBreakUp, numberVisits, personsReside, vacateHouse,
    max_penalty, price, area, subscriber_img, owner_img, option_flat, room, floor, about_agree FROM agreement WHERE subscriber_id = ? AND i_agree IS NULL LIMIT 10 OFFSET ?`, [user_id, offs.toString()])
    
    if (rows[0] !== undefined) {
      return await Promise.all(rows.map(async (e) => {
        let [img, fie]: [Array<any> | any, any] = await (await conect).execute("SELECT * FROM flat_img WHERE flat_id = ?", [e.flat_id])
        // let[agent_id, ff] :[ Array<any> | any, any] = await (await conect).execute("SELECT agent_id FROM flat WHERE flat_id = ?", [flat_id])
        if (img) {
          return { flat: e, img: await Promise.all(img.map((i: any) => i.img))}
        } else {
          return e
        }
      }))
    } else {
      return false
    }
  }

  async getUserAgreement(flat_id: string, user_id: string, offs: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM agreement WHERE flat_id = ? AND subscriber_id = ? LIMIT 10 OFFSET ?', [flat_id, user_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return false
    }
  }

  async getAgreement(agreement_id: string, flat_id: string, user_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM agreement WHERE agreement_id = ? AND flat_id = ? AND subscriber_id = ?', [agreement_id, flat_id, user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }

  async addAgreement(tok: any, owner_id: string, flat_id: string) {
    try {
      let [rows1, fields1] = await (await conect).execute('SELECT * FROM agreement WHERE flat_id = ? AND subscriber_id = ? AND owner_id = ? AND i_agree IS NULL', [flat_id, tok.subscriber.user_id, owner_id])
      if(rows1 !== undefined){
        let [rows, fie] = await (await conect).execute(`
      INSERT INTO agreement (agreement_id, subscriber_id, subscriber_firstName, subscriber_lastName, subscriber_surName, subscriber_email,
        subscriber_tell, owner_id, owner_firstName, owner_lastName, owner_surName, owner_email,
        owner_tell, flat_id, agreementDate, city, street, houseNumber,
        apartment, rent_due_data, penalty,
        max_penalty, price, area, subscriber_img, owner_img, ownership, dateAgreeStart, dateAgreeEnd, transferHouse, whoPayComun, depositPayment, dateAgreeBreakUp,
        numberVisits, personsReside, vacateHouse, option_flat, room, floor, about_agree) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        owner_id + flat_id + tok.subscriber.user_id + tok.terms.agreementDate,
        tok.subscriber.user_id,
        tok.subscriber.firstName,
        tok.subscriber.lastName,
        tok.subscriber.surName,
        tok.subscriber.mail,
        tok.subscriber.tell,
        owner_id,
        tok.owner.firstName,
        tok.owner.lastName,
        tok.owner.surName,
        tok.owner.mail,
        tok.owner.tell,
        flat_id,
        tok.terms.agreementDate,
        tok.house.city,
        tok.house.street,
        tok.house.houseNumber,
        tok.house.apartment,
        tok.terms.rent_due_data,
        tok.terms.penalty,
        tok.terms.max_penalty,
        tok.house.price,
        tok.house.area,
        tok.subscriber.subscriber_img,
        tok.owner.owner_img, tok.house.ownership, tok.terms.dateAgreeStart, tok.terms.dateAgreeEnd, tok.terms.transferHouse, 
        tok.terms.whoPayComun, tok.terms.depositPayment, tok.terms.dateAgreeBreakUp, tok.terms.numberVisits, tok.terms.personsReside,
        tok.terms.vacateHouse,
        tok.house.option_flat, tok.house.room, tok.house.floor, tok.terms.about
      ]
      );
      if (rows !== undefined) {
        return true;
      } else {
        return false;
      }
    }else{
      return {status: "Договір вже існує"}
    }} catch (err) {
      return false
    }
  }

  async addAct(tok: any, agreement_id: string, flat_id: string) {
    try {
      let [rows1, fields1] = await (await conect).execute('SELECT * FROM agreement WHERE agreement_id = ? AND flat_id = ?', [agreement_id, flat_id])
      let [aaa, fff] = await (await conect).execute('SELECT * FROM agreement_act WHERE agreement_id = ?', [agreement_id])
      let [aaa2, fff2] = await (await conect).execute('SELECT * FROM agreement_filling WHERE agreement_id = ? LIMIT 1', [agreement_id])
      if(rows1 !== undefined && aaa[0] === undefined){
        let [rows, fields3] = await (await conect).execute(`INSERT INTO agreement_act (agreement_id, electro, cold_water, hot_water, gas) VALUES (?, ?, ?, ?, ?)`,
        [agreement_id, tok.counter.electro, tok.counter.cold_water, tok.counter.hot_water, tok.counter.gas]);
        await Promise.all(tok.filling.map(async(i :any)=>{
          let [rows4, fields2] = await (await conect).execute(`INSERT INTO agreement_filling (agreement_id, type_filling, number_filling, condition_filling, img, about_filling, name_filling) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [agreement_id, i.type_filling, i.number_filling, i.condition_filling, i.img, i.about_filling, i.name_filling])
        }))
        if (rows !== undefined) {
          return true;
        } else {
          return false;
        }
    }else if(rows1 !== undefined && aaa[0] !== undefined && aaa2 === undefined ){
      await Promise.all(tok.filling.map(async(i :any)=>{
        let [rows4, fields2] = await (await conect).execute(`INSERT INTO agreement_filling (agreement_id, type_filling, number_filling, condition_filling, img, about_filling, name_filling) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
        [agreement_id, i.type_filling, i.number_filling, i.condition_filling, i.img, i.about_filling, i.name_filling])
      }))
      return true;
      
      
    }} catch (err) {
      return {status: "Акт вже існує"}
    }
  }

  async getAct(agreement_id: string, flat_id: string) {
    let [rows1, fields1] = await (await conect).execute('SELECT * FROM agreement WHERE agreement_id = ? AND flat_id = ?', [agreement_id, flat_id])
    if(rows1 !== undefined){
      let [rows, fields] = await (await conect).execute('SELECT * FROM agreement_act WHERE agreement_id = ?', [agreement_id])
      let [rows3, fields3] = await (await conect).execute('SELECT * FROM agreement_filling WHERE agreement_id = ?', [agreement_id])
    if (rows[0] !== undefined) {
      return [rows[0], rows3]
    } else {
      return false
    }
    }else{
      return false
    }
    
  }

  async getYAct(agreement_id: string, user_id: string) {
    let [rows1, fields1] = await (await conect).execute('SELECT * FROM agreement WHERE agreement_id = ? AND subscriber_id = ?', [agreement_id, user_id])
    if(rows1 !== undefined){
      let [rows, fields] = await (await conect).execute('SELECT * FROM agreement_act WHERE agreement_id = ?', [agreement_id])
      let [rows3, fields3] = await (await conect).execute('SELECT * FROM agreement_filling WHERE agreement_id = ?', [agreement_id])

    if (rows[0] !== undefined) {
      return [rows[0], rows3]
    } else {
      return false
    }
    }else{
      return false
    }
  }



  async getFlatOwner(flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT owner_id FROM flat WHERE flat_id = ?', [flat_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }




  async flatCheck(user_id: string, flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM flat WHERE flat_id = ? AND owner_id = ?;', [flat_id, user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }


  async flatRentCheck(flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM about WHERE flat_id = ? AND rent = 1;', [flat_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }


  async getComunalName(flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM comunal_name WHERE flat_id = ?;', [flat_id])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return false
    }
  }


  async getComunalNameDiscuss(flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT comunal_name FROM comunal_name WHERE flat_id = ?;', [flat_id])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return false
    }
  }

  async addComunalName(flat_id: string, comunal_name: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM comunal_name WHERE flat_id = ? AND comunal_name = ?;', [flat_id, comunal_name])
    if (rows[0] === undefined) {
      let [rows2, fields2] = await (await conect).execute('INSERT INTO comunal_name (flat_id, comunal_name) VALUES (?, ?)', [flat_id, comunal_name])
      return { status: "Данні по комуналці успішно змінені" }
    } else {
      return { status: "Данні по комуналці не змінені" }
    }
  }

  async addComunal(tok: any, user_id) {
    let comunal = await this.getComunalMo(tok.flat_id, tok.comunal_name, tok.when_pay_y, tok.when_pay_m)
    if (comunal[0]) {
      let [rows, fields] = await (await conect).execute('UPDATE comunal SET flat_id = ?, user_id = ?, option_sendData = ?, comunal_name = ?, comunal_before = ?, comunal_now = ?, howmuch_pay = ?, consumed = ?, tariff = ?, calc_howmuch_pay = ?, about_pay = ? WHERE flat_id = ? AND comunal_name = ? AND when_pay_m = ? AND when_pay_y = ?;',
        [tok.flat_id, user_id, tok.comunal.option_sendData, tok.comunal_name, tok.comunal.comunal_before, tok.comunal.comunal_now, Number(tok.comunal.howmuch_pay), tok.comunal.consumed, Number(tok.comunal.tariff), Number(tok.comunal.calc_howmuch_pay), tok.comunal.about_pay, tok.flat_id, tok.comunal_name, tok.when_pay_m, tok.when_pay_y])
      return rows
    } else {
      let [rows, fields] = await (await conect).execute('INSERT INTO comunal (flat_id, user_id, comunal_name, option_sendData, comunal_before, comunal_now, howmuch_pay, when_pay_m, when_pay_y, consumed, tariff, calc_howmuch_pay, about_pay) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [tok.flat_id, user_id, tok.comunal_name, tok.comunal.option_sendData, tok.comunal.comunal_before, tok.comunal.comunal_now, Number(tok.comunal.howmuch_pay), tok.when_pay_m, tok.when_pay_y, tok.comunal.consumed, Number(tok.comunal.tariff), Number(tok.comunal.calc_howmuch_pay), tok.comunal.about_pay])
      return rows
    }
  }

  async addComunalCompany(tok: any) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM comunal_name WHERE flat_id = ? AND comunal_name = ?;', [tok.flat_id, tok.comunal_name])
    if (rows[0] !== undefined) {
      let [rows, fields] = await (await conect).execute('UPDATE comunal_name SET comunal_company = ?, edrpo = ?, iban = ?, personalAccount = ?, comunal_address = ?, comunal_site = ?, comunal_phone = ?, about_comun = ? WHERE flat_id = ? AND comunal_name = ?;',
        [tok.comunal.comunal_company, tok.comunal.edrpo, tok.comunal.iban, tok.comunal.personalAccount, tok.comunal.comunal_address, tok.comunal.comunal_site, tok.comunal.comunal_phone, tok.comunal.about_comun, tok.flat_id, tok.comunal_name])
    } else {
      return { status: "Данні по комуналці не змінені" }
    }
  }


  async addComunalBefNow(tok: any) {
    let comunal = await this.getComunalMo(tok.flat_id, tok.comunal_name, tok.when_pay_y, tok.when_pay_m)
    if (comunal[0]) {
      let [rows, fields] = await (await conect).execute('UPDATE comunal SET comunal_before = ?, comunal_now = ?, option_sendData = ? WHERE flat_id = ? AND comunal_name = ? AND when_pay_m = ? AND when_pay_y = ?;',
        [tok.comunal.comunal_before, tok.comunal.comunal_now, tok.comunal.option_sendData, tok.flat_id, tok.comunal_name, tok.when_pay_m, tok.when_pay_y])
      return rows
    } else {
      let [rows, fields] = await (await conect).execute('INSERT INTO comunal (flat_id, comunal_name, comunal_before, comunal_now, when_pay_m, when_pay_y, option_sendData) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [tok.flat_id, tok.comunal_name, tok.comunal.comunal_before, tok.comunal.comunal_now, tok.when_pay_m, tok.when_pay_y, tok.comunal.option_sendData])
      return rows
    }
  }

  async getComunalYear(flat_id: string, comunal_name: string, when_pay_y: number) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM comunal WHERE flat_id = ? AND comunal_name = ? AND when_pay_y = ?;', [flat_id, comunal_name, when_pay_y])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }

  async getFlatName(flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT flat_name FROM flat WHERE flat_id = ? LIMIT 1;', [flat_id])
    if (rows[0] !== undefined) {
      return rows[0].flat_name
    } else {
      return []
    }
  }

  async getComunalAll(flat_id: string, when_pay_m: number, when_pay_y: number) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM comunal WHERE flat_id = ? AND when_pay_m = ? AND when_pay_y = ?;', [flat_id, when_pay_m, when_pay_y])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }

  async getComunalYearAll(flat_id: string, when_pay_y: number) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM comunal WHERE flat_id = ? AND when_pay_y = ?;', [flat_id, when_pay_y])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }


  async getComunalMo(flat_id: string, comunal_name: string, when_pay_y: number, when_pay_m: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM comunal WHERE flat_id = ? AND comunal_name = ? AND when_pay_y = ? AND when_pay_m = ?;', [flat_id, comunal_name, String(when_pay_y), when_pay_m])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }


  async getIDSubs(flat_id: string, offs: number) {
    const [rows, fields] = await (await conect).execute("SELECT * FROM subscribes WHERE flat_id = ? LIMIT 10 OFFSET ?;", [flat_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }

  async getIDuserSubs(flat_id: string, offs: number) {
    const [rows, fields] = await (await conect).execute("SELECT * FROM user_subscribes WHERE flat_id = ? LIMIT 10 OFFSET ?;", [flat_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }


  async getIDCitizen(flat_id: string, offs: string) {
    let [rows, fields] = await (await conect).execute('SELECT user_id, flat_id FROM citizen WHERE flat_id = ? LIMIT 10 OFFSET ?;', [flat_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }


  async getIDAccSubs(flat_id: string, offs: string) {
    let [rows, fields] = await (await conect).execute('SELECT user_id FROM accept_subs WHERE flat_id = ? LIMIT 10 OFFSET ?;', [flat_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }


  async getIDFlats(user_id: string, offs: string) {
    let [rows, fields] = await (await conect).execute('SELECT flat_id FROM subscribes WHERE user_id = ? LIMIT 10 OFFSET ?;', [user_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }

  async getUserIDFlats(user_id: string, offs: string) {
    let [rows, fields] = await (await conect).execute('SELECT flat_id FROM user_subscribes WHERE user_id = ? LIMIT 10 OFFSET ?;', [user_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }

  async getIDAccFlats(user_id: string, offs: string) {
    let [rows, fields] = await (await conect).execute('SELECT flat_id FROM accept_subs WHERE user_id = ? LIMIT 10 OFFSET ?;', [user_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }
// Перевірити
  async getIDCitizenFlats(user_id: string, offs: string) {
    let [rows, fields] = await (await conect).execute('SELECT flat_id FROM accept_subs WHERE user_id = ? LIMIT 10 OFFSET ?;', [user_id, offs.toString()])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return []
    }
  }


  async getFlatforAccSubs(flat_id: string) {
    let [rows, fields] = await (await conect).execute("SELECT flat.flat_id, flat.flat_name, flat.country, flat.region, flat.city, flat.street, \
    flat.houseNumber, flat.apartment, flat.flat_index, flat.distance_metro, \
    flat.distance_stop, flat.distance_shop, flat.distance_green, flat.distance_parking, \
    about.woman, about.man, about.family, about.students, about.animals, about.bunker, about.price_m, about.option_pay, \
    about.price_d, about.about, parametrs.rooms, parametrs.repair_status, parametrs.area, \
    parametrs.kitchen_area, parametrs.balcony, parametrs.floor FROM flat \
    JOIN parametrs ON flat.flat_id = parametrs.flat_id JOIN about ON flat.flat_id = about.flat_id \
    WHERE flat.flat_id = ?", [flat_id])
    let [img, fie]: [Array<any> | any, any] = await (await conect).execute("SELECT * FROM flat_img WHERE flat_id = ?", [flat_id])
    let agent_id  = await this.agent(flat_id)
    if (agent_id) {
      let user = await this.getAccSubsFlat(agent_id.user_id)
      return { flat: rows[0], img: await Promise.all(img.map((i: any) => i.img)), owner: user }
    } else {
      let [owner_id, fff]: [Array<any> | any, any] = await (await conect).execute("SELECT owner_id FROM flat WHERE flat_id = ?", [flat_id])
      let user = await this.getAccSubsFlat(owner_id[0].owner_id)
      return { flat: rows[0], img: await Promise.all(img.map((i: any) => i.img)), owner: user }
    }
  }

  async getFlatforUserSubs(flat_id: string) {
    let [rows, fields] = await (await conect).execute("SELECT flat.flat_id, flat.flat_name, flat.country, flat.region, flat.city, flat.street, \
    flat.houseNumber, flat.apartment, flat.flat_index, flat.distance_metro, \
    flat.distance_stop, flat.distance_shop, flat.distance_green, flat.distance_parking, \
    about.woman, about.man, about.family, about.students, about.animals, about.bunker, about.price_m, \
    about.price_d, about.about, parametrs.rooms, parametrs.repair_status, parametrs.area, \
    parametrs.kitchen_area, parametrs.balcony, parametrs.floor FROM flat \
    JOIN parametrs ON flat.flat_id = parametrs.flat_id JOIN about ON flat.flat_id = about.flat_id \
    WHERE flat.flat_id = ?", [flat_id])
    let [img, fie]: [Array<any> | any, any] = await (await conect).execute("SELECT * FROM flat_img WHERE flat_id = ?", [flat_id])
    let agent_id  = await this.agent(flat_id)
    if (agent_id) {
      let user = await this.getAccSubs(agent_id.user_id)
      return { flat: rows[0], img: await Promise.all(img.map((i: any) => i.img)), owner: user }
    } else {
      let [owner_id, fff]: [Array<any> | any, any] = await (await conect).execute("SELECT owner_id FROM flat WHERE flat_id = ?", [flat_id])
      let user = await this.getAccSubs(owner_id[0].owner_id)
      return { flat: rows[0], img: await Promise.all(img.map((i: any) => i.img)), owner: user }
    }
  }

  async getFlatforCitizen(flat_id: string) {
    let [rows, fields] = await (await conect).execute("SELECT flat.flat_id, flat.flat_name, flat.country, flat.region, flat.city, flat.street, \
    flat.houseNumber, flat.apartment, flat.flat_index, flat.distance_metro, \
    flat.distance_stop, flat.distance_shop, flat.distance_green, flat.distance_parking, \
    about.woman, about.man, about.family, about.students, about.animals, about.bunker, about.price_m, \
    about.price_d, about.about, parametrs.rooms, parametrs.repair_status, parametrs.area, \
    parametrs.kitchen_area, parametrs.balcony, parametrs.floor FROM flat \
    JOIN parametrs ON flat.flat_id = parametrs.flat_id JOIN about ON flat.flat_id = about.flat_id \
    WHERE flat.flat_id = ?", [flat_id])
    let [img, fie]: [Array<any> | any, any] = await (await conect).execute("SELECT * FROM flat_img WHERE flat_id = ?", [flat_id])
    let agent_id  = await this.agent(flat_id)
    if (agent_id) {
      let user = await this.getAccSubsFlat(agent_id.user_id)
      return { flat: rows[0], img: await Promise.all(img.map((i: any) => i.img)), owner: user }
    } else {
      let [owner_id, fff]: [Array<any> | any, any] = await (await conect).execute("SELECT owner_id FROM flat WHERE flat_id = ?", [flat_id])
      let user = await this.getAccSubsFlat(owner_id)
      return { flat: rows[0], img: await Promise.all(img.map((i: any) => i.img)), owner: user }
    }
  }


  async getFlatforSubs(flat_id: string) {
    let [rows, fields] = await (await conect).execute("SELECT flat.flat_id, flat.flat_name, flat.country, flat.region, flat.city, flat.street, \
    flat.houseNumber, flat.apartment, flat.flat_index, flat.distance_metro, \
    flat.distance_stop, flat.distance_shop, flat.distance_green, flat.distance_parking, \
    about.woman, about.man, about.family, about.students, about.animals, about.bunker, about.price_m, \
    about.price_d, about.about, parametrs.rooms, parametrs.repair_status, parametrs.area, \
    parametrs.kitchen_area, parametrs.balcony, parametrs.floor FROM flat \
    JOIN parametrs ON flat.flat_id = parametrs.flat_id JOIN about ON flat.flat_id = about.flat_id \
    WHERE about.rent = 1 AND flat.flat_id = ?", [flat_id])
    let [img, fie]: [Array<any> | any, any] = await (await conect).execute("SELECT * FROM flat_img WHERE flat_id = ?", [flat_id])
    if (rows[0] !== undefined) {
      return { flat: rows[0], img: await Promise.all(img.map((i: any) => i.img)) }
    } else {
      return false
    }
  }


  async getCitizen(user_id: string, flat_id: string) {
    let [rows, fields] = await (await conect).execute("SELECT users.user_id, users.firstName, users.lastName, users.surName, citizen.acces_filling, citizen.acces_subs, citizen.acces_discuss, citizen.acces_agreement, citizen.acces_citizen, citizen.acces_comunal_indexes, citizen.acces_agent, citizen.acces_flat_features, citizen.acces_flat_chats, \
    contacts.viber, contacts.tell, contacts.mail, contacts.instagram, contacts.telegram, contacts.facebook, citizen.acces_added, citizen.acces_admin , citizen.flat_id, citizen.acces_services, citizen.acces_comunal, user_img.img \
    FROM users JOIN contacts ON users.user_id = contacts.user_id \
    JOIN user_img ON users.user_id = user_img.user_id JOIN citizen ON users.user_id = citizen.user_id WHERE users.user_id = ? AND citizen.flat_id = ?", [user_id, flat_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return [{ status: 'Немає мешканців' }]
    }
  }


  async getAccSubs(user_id: string) {
    let [rows, fields] = await (await conect).execute("SELECT users.user_id, users.firstName, users.lastName, users.surName, \
    contacts.viber, contacts.instagram, contacts.telegram, contacts.facebook, contacts.tell, contacts.mail, user_img.img, features.country, features.region, features.city, features.distance_metro, features.distance_stop,\
    features.distance_shop, features.distance_green, features.distance_parking, features.woman, features.man, features.about, features.family,\
    features.students, features.animals, features.bunker, features.option_pay, features.price_of, features.price_to, features.house,\
    features.room, features.flat, features.agree_search, features.looking_woman, features.looking_man, features.rooms_of,\
    features.rooms_to, features.repair_status, features.area_of, features.area_to, features.balcony, features.purpose_rent, features.days,\
    features.weeks, features.mounths, features.years, features.day_counts \
    FROM users JOIN contacts ON users.user_id = contacts.user_id JOIN features ON users.user_id = features.user_id \
    JOIN user_img ON users.user_id = user_img.user_id WHERE users.user_id = ?", [user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return [{ status: 'Немає підтверджених підписників' }]
    }
  }

  async getAccSubsFlat(user_id: string) {
    let [rows, fields] = await (await conect).execute("SELECT users.user_id, users.firstName, users.lastName, users.surName, \
    contacts.viber, contacts.instagram, contacts.telegram, contacts.facebook, contacts.tell, contacts.mail, user_img.img \
    FROM users JOIN contacts ON users.user_id = contacts.user_id \
    JOIN user_img ON users.user_id = user_img.user_id WHERE users.user_id = ?", [user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return [{ status: 'Немає підтверджених підписників' }]
    }
  }


  async getSubs(user_id: string) {
    let [rows, fields] = await (await conect).execute("SELECT users.user_id, users.firstName, users.lastName, users.surName, \
    contacts.viber, contacts.instagram, contacts.telegram, contacts.facebook, user_img.img \
    FROM users JOIN contacts ON users.user_id = contacts.user_id \
    JOIN user_img ON users.user_id = user_img.user_id WHERE users.user_id = ?", [user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return [{ status: 'Немає підписників' }]
    }
  }


  async getUserSubs(user_id: string) {
    let [rows, fields] = await (await conect).execute("SELECT users.user_id, users.firstName, users.lastName, users.surName, \
    features.country, features.region, features.city, features.distance_metro, features.distance_stop, features.about,\
    features.distance_shop, features.distance_green, features.distance_parking, features.woman, features.man, features.family,\
    features.students, features.animals, features.bunker, features.option_pay, features.price_of, features.price_to, features.house,\
    features.room, features.flat, features.agree_search, features.looking_woman, features.looking_man, features.rooms_of,\
    features.rooms_to, features.repair_status, features.area_of, features.area_to, features.balcony, features.purpose_rent, features.days,\
    features.weeks, features.mounths, features.years, features.day_counts, user_img.img \
    FROM users JOIN contacts ON users.user_id = contacts.user_id JOIN features ON users.user_id = features.user_id \
    JOIN user_img ON users.user_id = user_img.user_id WHERE users.user_id = ?", [user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return [{ status: 'Немає підписників' }]
    }
  }


  async citizen(user_id: string, flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM citizen WHERE flat_id = ? AND user_id = ?;', [flat_id, user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }


  async accept_subs(user_id: string, flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM accept_subs WHERE flat_id = ? AND user_id = ?;', [flat_id, user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }


  async subscribes(user_id: string, flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM subscribes WHERE flat_id = ? AND user_id = ?;', [flat_id, user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }

  async user_subscribes(user_id: string, flat_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM user_subscribes WHERE flat_id = ? AND user_id = ?;', [flat_id, user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }

  async feature_user(user_id: string) {
    let [rows, fields] = await (await conect).execute('SELECT user_id FROM features WHERE agree_search = true AND user_id = ?;', [user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }


  async getAgentFLS(user_id: any) {
    let [rows, fields] = await (await conect).execute('SELECT firstName, lastName, surName FROM users WHERE user_id = ?;', [user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return undefined
    }
  }



  async authentification(tok: any) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM users WHERE user_mail = ? AND password = ?;', [tok.email, tok.password])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return undefined
    }
  }


  async getContacts(tok: any) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM contacts WHERE user_id = ?;', [tok.user_id])
    if (rows[0] !== undefined) {
      return rows[0]
    } else {
      return false
    }
  }


  async getUserImg(tok: any) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM user_img WHERE user_id = ?;', [tok.user_id])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return false
    }
  }

  async addFlatinf(tok: any, flat_id: string) {
    let inf = await this.getFlatinf(flat_id)
    try{
      if (inf[0]) {
        let [rows, fields] = await (await conect).execute('UPDATE flat_inf SET osbb_phone = ?, pay_card = ?, wifi = ?, osbb_name = ?, info_about = ? WHERE flat_id = ?;',
          [tok.osbb_phone, tok.pay_card, tok.wifi, tok.osbb_name, tok.info_about, flat_id])
        return rows
      } else {
        let [rows, fields] = await (await conect).execute('INSERT INTO flat_inf (flat_id, osbb_phone, pay_card, wifi, osbb_name, info_about) VALUES (?, ?, ?, ?, ?, ?)',
          [flat_id, tok.osbb_phone, tok.pay_card, tok.wifi, tok.osbb_name, tok.info_about]) 
        return rows
      }
    }catch{
      return "Не правильно передані данні"
    }
  }


  async getFlatinf(flat_id: any) {
    let [rows, fields] = await (await conect).execute('SELECT * FROM flat_inf WHERE flat_id = ?;', [flat_id])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return false
    } 
  }


  async deleteFlat(flat_id: any) {
    let [rows, fields] : [any, any] = await (await conect).execute('SELECT * FROM chat WHERE flat_id = ?', [flat_id])
    try{
      await (await conect).execute('DELETE FROM comunal WHERE flat_id = ?;', [flat_id])
    await (await conect).execute('DELETE FROM comunal_name WHERE flat_id = ?;', [flat_id])
    await (await conect).execute('DELETE FROM about WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM parametrs WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM flat_img WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM filling WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM flat_inf WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM subscribes WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM user_subscribes WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM accept_subs WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM citizen WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM agreement WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM citizen WHERE flat_id = ?', [flat_id])
    await (await conect).execute('DELETE FROM agreement WHERE flat_id = ?', [flat_id])
    await Promise.all(rows.map( async(i :any) => {
      await (await conect).execute('DELETE FROM message WHERE chat_id = ?', [i.chat_id])
      await (await conect).execute('DELETE FROM chat WHERE chat_id = ?', [i.chat_id])
      await (await conect).execute('DELETE FROM chat_name WHERE chat_id = ?', [i.chat_id])
    }))
    }catch{
      return false
    }
    
  return true
  }

  async deleteComunal(flat_id: any, comunal_name : string) {
    try{
      await (await conect).execute('DELETE FROM comunal WHERE flat_id = ? AND comunal_name = ?;', [flat_id, comunal_name])
      await (await conect).execute('DELETE FROM comunal_name WHERE flat_id = ? AND comunal_name = ?;', [flat_id, comunal_name])
    }catch{
      return false
    }
    
  return true
  }

  async getFeedback(user_id: any, menuName: any) {
    let [rows, fields] = await (await conect).execute('SELECT user_id, menuComment, menuName, optionComfort, optionDesign, optionDevice, optionFunctional, optionImpression FROM feedback WHERE user_id = ? AND menuName = ?  LIMIT 1;', [user_id, menuName])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return false
    } 
  }

  async getAdminFeedback(menuName: any) {
    let [rows, fields] = await (await conect).execute('SELECT user_id, menuComment, menuName, data, optionComfort, optionDesign, optionDevice, optionFunctional, optionImpression FROM feedback WHERE menuName = ?;', [menuName])
    if (rows[0] !== undefined) {
      return rows
    } else {
      return false
    } 
  }


  async addFeedback(tok: any, user_id: string) {
    let inf = await this.getFeedback(user_id, tok.menuName)
    if (inf[0]) {
      let [rows, fields] = await (await conect).execute('UPDATE feedback SET menuComment = ?, data = ?, optionComfort = ?, optionDesign = ?, optionDevice = ?, optionFunctional = ?, optionImpression = ? WHERE user_id = ? AND menuName = ?;',
        [tok.menuComment, new Date(), tok.optionComfort, tok.optionDesign, tok.optionDevice, tok.optionFunctional, tok.optionImpression, user_id, tok.menuName])
      return rows
    } else {
      let [rows, fields] = await (await conect).execute('INSERT INTO feedback (user_id, menuComment, menuName, data, optionComfort, optionDesign, optionDevice, optionFunctional, optionImpression) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [user_id, tok.menuComment, tok.menuName, new Date(), tok.optionComfort, tok.optionDesign, tok.optionDevice, tok.optionFunctional, tok.optionImpression]) 
      return rows
    }
  }


}
