/* eslint-disable prettier/prettier */
import * as mysql from 'mysql2'
import * as mmm from 'mysql2/promise'

const config = {
    host: 'mysql',
    user: 'root',
    password: 'discuss32144',
    insecureAuth: true,
    database: "disscussio_beta_1",

}


// const config = {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'y4kQuRF<ct?O0',
//     insecureAuth: true,
//     database: 'users9000',

// }

const conee = mysql.createConnection(config)



export default conee