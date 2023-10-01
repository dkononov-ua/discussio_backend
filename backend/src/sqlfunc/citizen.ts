// import conect from "./db";


// async function citizen(user_id: string, flat_id: string) {
//     let [rows, fields] = await (await conect).execute('SELECT * FROM citizen WHERE flat_id = ? AND owner_id = ?;',[flat_id, user_id])
//     if(rows[0] === true){
//         return rows[0]
//     }else{
//         return undefined
//     }   
// }

// export default citizen