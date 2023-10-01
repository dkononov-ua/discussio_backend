import mysql from 'mysql'


console.log(121)

const conf = {
    host: "mysql",
    user: "root",
    password: "discuss32144",
    insecureAuth : true
}



const con = mysql.createConnection(conf)
console.log(111)
con.connect(function(err) {
    if (err) throw err;
    console.log(222)
    con.query("CREATE DATABASE IF NOT EXISTS disscussio_beta_1", function (err, result) {
    if (err) throw err;})
    con.end()
})


