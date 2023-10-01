import mysql from 'mysql'




const conf = {
    host: "mysql",
    user: "root",
    password: "discuss32144",
    insecureAuth : true
}

conf.database = "disscussio_beta_1"



const con = mysql.createConnection(conf)


// Створити базу данних
// con.connect(function(err) {
//     if (err) throw err;
//     console.log(222)
//     con.query("CREATE DATABASE IF NOT EXISTS us33", function (err, result) {
//     if (err) throw err;})
//     con.end()
// })







// Нові таблиці з перевірками
con.connect((err)=> {
var sql = "CREATE TABLE IF NOT EXISTS users ( \
    user_id INT PRIMARY KEY AUTO_INCREMENT, \
    user_mail VARCHAR(256) CHECK (LENGTH(user_mail) <= 256) UNIQUE, \
    firstName VARCHAR(50) CHECK (LENGTH(firstName) <= 50), \
    lastName VARCHAR(50) CHECK (LENGTH(lastName) <= 50), \
    surName VARCHAR(50) CHECK (LENGTH(surName) <= 50), \
    password VARCHAR(30) CHECK (LENGTH(password) <= 30), \
    dob DATETIME NOT NULL \
  )";
con.query(sql, (err, result) => {
    if (err) throw err;
});

con.query("ALTER TABLE users ADD INDEX user_ibfk_1 (user_id);", (err, result)=> {
    if (err) throw err;
});




con.query("CREATE TABLE IF NOT EXISTS user_parametrs ( \
    user_id INT, \
    add_in_flat BOOLEAN CHECK (add_in_flat IN (TRUE, FALSE)) DEFAULT FALSE, \
    FOREIGN KEY (user_id) REFERENCES users(user_id) \
  )", (err, result)=> {
    if (err) throw err;
});




con.query("CREATE TABLE IF NOT EXISTS feedback ( \
    user_id INT, \
    menuComment VARCHAR(900) CHECK (LENGTH(menuComment) <= 900), \
    menuName VARCHAR(70) CHECK (LENGTH(menuName) <= 70), \
    data DATETIME, \
    optionComfort TINYINT CHECK (REGEXP_LIKE(optionComfort, '^[0-9]+(\.[0-9]+)?$') AND optionComfort BETWEEN 0 AND 100), \
    optionDesign TINYINT CHECK (REGEXP_LIKE(optionDesign, '^[0-9]+(\.[0-9]+)?$') AND optionDesign BETWEEN 0 AND 100), \
    optionDevice TINYINT CHECK (REGEXP_LIKE(optionDevice, '^[0-9]+(\.[0-9]+)?$') AND optionDevice BETWEEN 0 AND 100), \
    optionFunctional TINYINT CHECK (REGEXP_LIKE(optionFunctional, '^[0-9]+(\.[0-9]+)?$') AND optionFunctional BETWEEN 0 AND 100), \
    optionImpression TINYINT CHECK (REGEXP_LIKE(optionImpression, '^[0-9]+(\.[0-9]+)?$') AND optionImpression BETWEEN 0 AND 100), \
    FOREIGN KEY (user_id) REFERENCES users(user_id) \
  )", (err, result)=> {
    if (err) throw err;
});




con.query("CREATE TABLE IF NOT EXISTS contacts ( \
    user_id INT, \
    viber VARCHAR(70) CHECK (LENGTH(viber) <= 70), \
    instagram VARCHAR(70) CHECK (LENGTH(instagram) <= 70), \
    telegram VARCHAR(70) CHECK (LENGTH(telegram) <= 70), \
    facebook VARCHAR(70) CHECK (LENGTH(facebook) <= 70), \
    tell VARCHAR(50) CHECK (LENGTH(tell) <= 50), \
    phone_alt VARCHAR(50) CHECK (LENGTH(phone_alt) <= 50), \
    mail VARCHAR(70) CHECK (LENGTH(mail) <= 70), \
    FOREIGN KEY (user_id) REFERENCES users(user_id) \
  )", (err, result)=> {
    if (err) throw err;
});


// const tableName = 'features';
// const deleteTableQuery = `DROP TABLE IF EXISTS ${tableName}`;

// con.query(deleteTableQuery, (err, result) => {
//   if (err) throw err;
//   console.log(`Таблиця ${tableName} успішно видалена.`);
// });


con.query("CREATE TABLE IF NOT EXISTS features ( \
    user_id INT, \
    data DATETIME, \
    about VARCHAR(900) CHECK (LENGTH(about) <= 900), \
    country VARCHAR(70) CHECK (LENGTH(country) <= 70), \
    region VARCHAR(70) CHECK (LENGTH(region) <= 70), \
    city VARCHAR(70) CHECK (LENGTH(city) <= 70), \
    distance_metro MEDIUMINT CHECK (REGEXP_LIKE(distance_metro, '^[0-9]+$') AND distance_metro BETWEEN -1000000 AND 1000000), \
    distance_stop MEDIUMINT CHECK (REGEXP_LIKE(distance_stop, '^[0-9]+$') AND distance_stop BETWEEN -1000000 AND 1000000), \
    distance_shop MEDIUMINT CHECK (REGEXP_LIKE(distance_shop, '^[0-9]+$') AND distance_shop BETWEEN -1000000 AND 1000000), \
    distance_green MEDIUMINT CHECK (REGEXP_LIKE(distance_green, '^[0-9]+$') AND distance_green BETWEEN -1000000 AND 1000000), \
    distance_parking MEDIUMINT CHECK (REGEXP_LIKE(distance_parking, '^[0-9]+$') AND distance_parking BETWEEN -1000000 AND 1000000), \
    woman BOOLEAN CHECK (woman IN (TRUE, FALSE)) DEFAULT FALSE, \
    man BOOLEAN CHECK (man IN (TRUE, FALSE)) DEFAULT FALSE, \
    family BOOLEAN CHECK (family IN (TRUE, FALSE)) DEFAULT FALSE, \
    students BOOLEAN CHECK (students IN (TRUE, FALSE)) DEFAULT FALSE, \
    animals VARCHAR(30) CHECK (LENGTH(animals) <= 30), \
    bunker VARCHAR(30) CHECK (LENGTH(bunker) <= 30), \
    option_pay TINYINT CHECK (REGEXP_LIKE(option_pay, '^[0-9]+(\.[0-9]+)?$') AND option_pay BETWEEN 0 AND 30), \
    price_of DECIMAL(15, 2) CHECK (REGEXP_LIKE(price_of, '^[0-9]+(\.[0-9]+)?$') AND price_of BETWEEN -1000000 AND 100000000), \
    price_to DECIMAL(15, 2) CHECK (REGEXP_LIKE(price_to, '^[0-9]+(\.[0-9]+)?$') AND price_to BETWEEN -1000000 AND 100000000), \
    house BOOLEAN CHECK (house IN (TRUE, FALSE)), \
    room BOOLEAN CHECK (room IN (TRUE, FALSE)), \
    flat BOOLEAN CHECK (flat IN (TRUE, FALSE)), \
    agree_search BOOLEAN CHECK (agree_search IN (TRUE, FALSE)), \
    looking_woman BOOLEAN CHECK (looking_woman IN (TRUE, FALSE)), \
    looking_man BOOLEAN CHECK (looking_man IN (TRUE, FALSE)), \
    rooms_of MEDIUMINT CHECK (REGEXP_LIKE(rooms_of, '^[0-9]+$') AND rooms_of BETWEEN -1000000 AND 1000000), \
    rooms_to MEDIUMINT CHECK (REGEXP_LIKE(rooms_to, '^[0-9]+$') AND rooms_to BETWEEN -1000000 AND 1000000), \
    repair_status VARCHAR(30) CHECK (LENGTH(repair_status) <= 30), \
    area_of DECIMAL(10, 2) CHECK (REGEXP_LIKE(area_of, '^[0-9]+(\.[0-9]+)?$') AND area_of BETWEEN -1000000 AND 1000000), \
    area_to DECIMAL(10, 2) CHECK (REGEXP_LIKE(area_to, '^[0-9]+(\.[0-9]+)?$') AND area_to BETWEEN -1000000 AND 1000000), \
    balcony VARCHAR(30) CHECK (LENGTH(balcony) <= 30), \
    purpose_rent VARCHAR(30) CHECK (LENGTH(purpose_rent) <= 30), \
    days MEDIUMINT CHECK (REGEXP_LIKE(days, '^[0-9]+$') AND days BETWEEN 0 AND 1000), \
    weeks MEDIUMINT CHECK (REGEXP_LIKE(weeks, '^[0-9]+$') AND weeks BETWEEN 0 AND 1000), \
    mounths MEDIUMINT CHECK (REGEXP_LIKE(mounths, '^[0-9]+$') AND mounths BETWEEN 0 AND 1000), \
    years MEDIUMINT CHECK (REGEXP_LIKE(years, '^[0-9]+$') AND years BETWEEN 0 AND 1000), \
    day_counts MEDIUMINT CHECK (REGEXP_LIKE(day_counts, '^[0-9]+$') AND day_counts BETWEEN -1000000 AND 1000000), \
    FOREIGN KEY (user_id) REFERENCES users(user_id) \
  )", (err, result)=> {
    if (err) throw err;
});




con.query("CREATE TABLE IF NOT EXISTS use_security ( \
    firstName VARCHAR(50) CHECK (LENGTH(firstName) <= 50), \
    email VARCHAR(256) PRIMARY KEY CHECK (LENGTH(email) <= 256), \
    new_email VARCHAR(70) CHECK (LENGTH(new_email) <= 70), \
    password VARCHAR(30) CHECK (LENGTH(password) <= 30), \
    em_pass VARCHAR(10) CHECK (LENGTH(em_pass) <= 10), \
    new_em_pass VARCHAR(10) CHECK (LENGTH(new_em_pass) <= 10), \
    attempt_counter TINYINT, \
    check_name VARCHAR(10) CHECK (LENGTH(check_name) <= 10) \
  )", (err, result) => {
    if (err) throw err;
});

con.query("CREATE TABLE IF NOT EXISTS flat ( \
    owner_id INT, \
    agent_id INT, \
    flat_name VARCHAR(70) CHECK (LENGTH(flat_name) <= 70), \
    flat_id INT PRIMARY KEY AUTO_INCREMENT, \
    country VARCHAR(70) CHECK (LENGTH(country) <= 70), \
    region VARCHAR(70) CHECK (LENGTH(region) <= 70), \
    city VARCHAR(70) CHECK (LENGTH(city) <= 70), \
    street VARCHAR(70) CHECK (LENGTH(street) <= 70), \
    houseNumber VARCHAR(10) CHECK (LENGTH(houseNumber) <= 10), \
    apartment VARCHAR(10) CHECK (LENGTH(apartment) <= 10), \
    flat_index VARCHAR(10) CHECK (LENGTH(flat_index) <= 10), \
    distance_metro MEDIUMINT CHECK (REGEXP_LIKE(distance_metro, '^[0-9]+$') AND distance_metro BETWEEN -1000000 AND 1000000), \
    distance_stop MEDIUMINT CHECK (REGEXP_LIKE(distance_stop, '^[0-9]+$') AND distance_stop BETWEEN -1000000 AND 1000000), \
    distance_shop MEDIUMINT CHECK (REGEXP_LIKE(distance_shop, '^[0-9]+$') AND distance_shop BETWEEN -1000000 AND 1000000), \
    distance_green MEDIUMINT CHECK (REGEXP_LIKE(distance_green, '^[0-9]+$') AND distance_green BETWEEN -1000000 AND 1000000), \
    distance_parking MEDIUMINT CHECK (REGEXP_LIKE(distance_parking, '^[0-9]+$') AND distance_parking BETWEEN -1000000 AND 1000000), \
    FOREIGN KEY (owner_id) REFERENCES users(user_id), \
    FOREIGN KEY (agent_id) REFERENCES users(user_id) \
  )", (err, result)=> {
    if (err) throw err;
});

con.query("ALTER TABLE flat ADD INDEX flat_id_ibk1 (flat_id);", (err, result)=> {
    console.log(123)
    if (err) throw err;
});


con.query("CREATE TABLE IF NOT EXISTS flat_inf ( \
    flat_id INT, \
    osbb_phone VARCHAR(50) CHECK (LENGTH(osbb_phone) <= 50), \
    pay_card VARCHAR(50) CHECK (LENGTH(pay_card) <= 50), \
    wifi VARCHAR(100) CHECK (LENGTH(wifi) <= 100), \
    osbb_name VARCHAR(50) CHECK (LENGTH(osbb_name) <= 50), \
    info_about VARCHAR(900) CHECK (LENGTH(info_about) <= 900), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id) \
  )", (err, result)=> {
    if (err) throw err;
});

con.query("CREATE TABLE IF NOT EXISTS filling ( \
    flat_id INT, \
    filling_id INT PRIMARY KEY AUTO_INCREMENT, \
    type_filling VARCHAR(50) CHECK (LENGTH(type_filling) <= 50), \
    number_filling MEDIUMINT CHECK (REGEXP_LIKE(number_filling, '^[0-9]+$') AND number_filling BETWEEN -1000000 AND 1000000), \
    condition_filling VARCHAR(50) CHECK (LENGTH(condition_filling) <= 50), \
    img VARCHAR(120) CHECK (LENGTH(img) <= 120), \
    about_filling VARCHAR(900) CHECK (LENGTH(about_filling) <= 900), \
    name_filling VARCHAR(70) CHECK (LENGTH(name_filling) <= 70), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id) \
  )", (err, result)=> {
    if (err) throw err;
});







  
con.query("CREATE TABLE IF NOT EXISTS about ( \
    flat_id INT, \
    data DATETIME, \
    option_pay TINYINT CHECK (REGEXP_LIKE(option_pay, '^[0-9]+(\.[0-9]+)?$') AND option_pay BETWEEN 0 AND 30), \
    room BOOLEAN CHECK (room IN (TRUE, FALSE)), \
    private BOOLEAN CHECK (private IN (TRUE, FALSE)), \
    rent BOOLEAN CHECK (rent IN (TRUE, FALSE)), \
    woman BOOLEAN CHECK (woman IN (TRUE, FALSE)), \
    man BOOLEAN CHECK (man IN (TRUE, FALSE)), \
    family BOOLEAN CHECK (family IN (TRUE, FALSE)), \
    students BOOLEAN CHECK (students IN (TRUE, FALSE)), \
    animals VARCHAR(30) CHECK (LENGTH(animals) <= 30), \
    bunker VARCHAR(30) CHECK (LENGTH(bunker) <= 30), \
    price_m DECIMAL(15, 2) CHECK (REGEXP_LIKE(price_m, '^[0-9]+(\.[0-9]+)?$') AND price_m BETWEEN -1000000 AND 100000000), \
    price_d DECIMAL(15, 2) CHECK (REGEXP_LIKE(price_d, '^[0-9]+(\.[0-9]+)?$') AND price_d BETWEEN -1000000 AND 100000000), \
    about VARCHAR(900) CHECK (LENGTH(about) <= 900), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id) \
  )", (err, result)=> {
    if (err) throw err;
});
  
con.query("CREATE TABLE IF NOT EXISTS parametrs ( \
    flat_id INT, \
    option_flat TINYINT CHECK (REGEXP_LIKE(option_flat, '^[0-9]+(\.[0-9]+)?$') AND option_flat BETWEEN 0 AND 30), \
    rooms MEDIUMINT CHECK (REGEXP_LIKE(rooms, '^[0-9]+$') AND rooms BETWEEN -1000000 AND 1000000), \
    repair_status VARCHAR(30) CHECK (LENGTH(repair_status) <= 30), \
    area DECIMAL(10, 2) CHECK (REGEXP_LIKE(area, '^[0-9]+(\.[0-9]+)?$') AND area BETWEEN -1000000 AND 1000000), \
    kitchen_area DECIMAL(10, 2) CHECK (REGEXP_LIKE(kitchen_area, '^[0-9]+(\.[0-9]+)?$') AND kitchen_area BETWEEN -1000000 AND 1000000), \
    balcony VARCHAR(30) CHECK (LENGTH(balcony) <= 30), \
    floor MEDIUMINT CHECK (REGEXP_LIKE(floor, '^[0-9]+$') AND floor BETWEEN -1000000 AND 1000000), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id) \
  )", (err, result)=> {
    if (err) throw err;
});
  




con.query("CREATE TABLE IF NOT EXISTS flat_img ( \
    flat_id INT, \
    img VARCHAR(120) CHECK (LENGTH(img) <= 120), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id) \
  )", (err, result)=> {
    if (err) throw err;
});
  
con.query("CREATE TABLE IF NOT EXISTS user_img ( \
    user_id INT, \
    img VARCHAR(120) CHECK (LENGTH(img) <= 120), \
    FOREIGN KEY (user_id) REFERENCES users(user_id) \
  )", (err, result)=> {
    if (err) throw err;
});
  
con.query("CREATE TABLE IF NOT EXISTS comunal_name ( \
    flat_id INT, \
    comunal_name VARCHAR(70) CHECK (LENGTH(comunal_name) <= 70), \
    comunal_company VARCHAR(70) CHECK (LENGTH(comunal_company) <= 70), \
    edrpo VARCHAR(50) CHECK (LENGTH(edrpo) <= 50), \
    iban VARCHAR(70) CHECK (LENGTH(iban) <= 70), \
    personalAccount VARCHAR(70) CHECK (LENGTH(personalAccount) <= 70), \
    comunal_address VARCHAR(70) CHECK (LENGTH(comunal_address) <= 70), \
    comunal_site VARCHAR(70) CHECK (LENGTH(comunal_site) <= 70), \
    comunal_phone VARCHAR(70) CHECK (LENGTH(comunal_phone) <= 70), \
    about_comun VARCHAR(900) CHECK (LENGTH(about_comun) <= 900), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id) \
  )", (err, result)=> {
    if (err) throw err;
});

con.query("ALTER TABLE comunal_name ADD INDEX comunal_ibfk_1 (comunal_name);", (err, result)=> {
    console.log(123)
    if (err) throw err;
});

con.query("CREATE TABLE IF NOT EXISTS comunal ( \
    flat_id INT, \
    user_id VARCHAR(256), \
    option_sendData MEDIUMINT CHECK (REGEXP_LIKE(option_sendData, '^[0-9]+$') AND option_sendData BETWEEN -1000000 AND 1000000), \
    comunal_name VARCHAR(70) CHECK (LENGTH(comunal_name) <= 70), \
    comunal_counter VARCHAR(70) CHECK (LENGTH(comunal_counter) <= 70), \
    comunal_before VARCHAR(70) CHECK (LENGTH(comunal_before) <= 70), \
    comunal_now VARCHAR(50) CHECK (LENGTH(comunal_now) <= 50), \
    howmuch_pay DECIMAL(10, 2) CHECK (REGEXP_LIKE(howmuch_pay, '^[0-9]+(\.[0-9]+)?$') AND howmuch_pay BETWEEN -1000000 AND 1000000), \
    when_pay_m VARCHAR(70) CHECK (LENGTH(when_pay_m) <= 70), \
    when_pay_y VARCHAR(70) CHECK (LENGTH(when_pay_y) <= 70), \
    consumed VARCHAR(20) CHECK (LENGTH(consumed) <= 20), \
    tariff DECIMAL(10, 2) CHECK (REGEXP_LIKE(tariff, '^[0-9]+(\.[0-9]+)?$') AND tariff BETWEEN -1000000 AND 1000000), \
    calc_howmuch_pay DECIMAL(10, 2) CHECK (REGEXP_LIKE(calc_howmuch_pay, '^[0-9]+(\.[0-9]+)?$') AND calc_howmuch_pay BETWEEN -1000000 AND 1000000), \
    about_pay VARCHAR(900) CHECK (LENGTH(about_pay) <= 900), \
    FOREIGN KEY (comunal_name) REFERENCES comunal_name(comunal_name) \
  )", (err, result)=> {
    console.log(444)
    if (err) throw err;
});




con.query("CREATE TABLE IF NOT EXISTS subscribes (flat_id INT, user_id INT, FOREIGN KEY (flat_id) REFERENCES flat(flat_id), FOREIGN KEY (user_id) REFERENCES users(user_id))", (err, result)=> {
        console.log(444)
        if (err) throw err;
});

con.query("CREATE TABLE IF NOT EXISTS user_subscribes (flat_id INT, user_id INT, FOREIGN KEY (flat_id) REFERENCES flat(flat_id), FOREIGN KEY (user_id) REFERENCES users(user_id))", (err, result)=> {
        console.log(444)
        if (err) throw err;
});

con.query("CREATE TABLE IF NOT EXISTS accept_subs (flat_id INT, user_id INT, FOREIGN KEY (flat_id) REFERENCES flat(flat_id), FOREIGN KEY (user_id) REFERENCES users(user_id))", (err, result)=> {
    console.log(444)
    if (err) throw err;
});




con.query("CREATE TABLE IF NOT EXISTS citizen ( \
    user_id INT, \
    flat_id INT, \
    acces_added BOOLEAN CHECK (acces_added IN (TRUE, FALSE)), \
    acces_admin BOOLEAN CHECK (acces_admin IN (TRUE, FALSE)), \
    acces_services BOOLEAN CHECK (acces_services IN (TRUE, FALSE)), \
    acces_comunal BOOLEAN CHECK (acces_comunal IN (TRUE, FALSE)), \
    acces_filling BOOLEAN CHECK (acces_filling IN (TRUE, FALSE)), \
    acces_subs BOOLEAN CHECK (acces_subs IN (TRUE, FALSE)), \
    acces_discuss BOOLEAN CHECK (acces_discuss IN (TRUE, FALSE)), \
    acces_agreement BOOLEAN CHECK (acces_agreement IN (TRUE, FALSE)), \
    acces_citizen BOOLEAN CHECK (acces_citizen IN (TRUE, FALSE)), \
    acces_comunal_indexes BOOLEAN CHECK (acces_comunal_indexes IN (TRUE, FALSE)), \
    acces_agent BOOLEAN CHECK (acces_agent IN (TRUE, FALSE)), \
    acces_flat_features BOOLEAN CHECK (acces_flat_features IN (TRUE, FALSE)), \
    acces_flat_chats BOOLEAN CHECK (acces_flat_chats IN (TRUE, FALSE)), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id), \
    FOREIGN KEY (user_id) REFERENCES users(user_id))", (err, result)=> {
    if (err) throw err;
});






con.query("CREATE TABLE IF NOT EXISTS agreement ( \
    agreement_id VARCHAR(300) PRIMARY KEY CHECK (LENGTH(agreement_id) <= 200) NOT NULL, \
    subscriber_id INT NOT NULL, \
    subscriber_firstName VARCHAR(50) CHECK (LENGTH(subscriber_firstName) <= 50) NOT NULL, \
    subscriber_lastName VARCHAR(50) CHECK (LENGTH(subscriber_lastName) <= 50) NOT NULL, \
    subscriber_surName VARCHAR(50) CHECK (LENGTH(subscriber_surName) <= 50) NOT NULL, \
    subscriber_email VARCHAR(70) CHECK (LENGTH(subscriber_email) <= 70) NOT NULL, \
    subscriber_tell VARCHAR(50) CHECK (LENGTH(subscriber_tell) <= 50) NOT NULL, \
    subscriber_img VARCHAR(120) CHECK (LENGTH(subscriber_img) <= 120), \
    owner_id INT NOT NULL, \
    owner_firstName VARCHAR(50) CHECK (LENGTH(owner_firstName) <= 50) NOT NULL, \
    owner_lastName VARCHAR(50) CHECK (LENGTH(owner_lastName) <= 50) NOT NULL, \
    owner_surName VARCHAR(50) CHECK (LENGTH(owner_surName) <= 50) NOT NULL, \
    owner_email VARCHAR(70) CHECK (LENGTH(owner_email) <= 70) NOT NULL, \
    owner_tell VARCHAR(50) CHECK (LENGTH(owner_tell) <= 50) NOT NULL, \
    owner_img VARCHAR(120) CHECK (LENGTH(owner_img) <= 120), \
    flat_id INT NOT NULL, \
    room BOOLEAN CHECK (room IN (TRUE, FALSE)) NOT NULL, \
    option_flat TINYINT CHECK (REGEXP_LIKE(option_flat, '^[0-9]+(\.[0-9]+)?$') AND option_flat BETWEEN 0 AND 30) NOT NULL, \
    dateAgreeStart VARCHAR(70) CHECK (LENGTH(dateAgreeStart) <= 70) NOT NULL, \
    dateAgreeEnd VARCHAR(70) CHECK (LENGTH(dateAgreeEnd) <= 70) NOT NULL, \
    ownership VARCHAR(70) CHECK (LENGTH(ownership) <= 70), \
    transferHouse VARCHAR(70) CHECK (LENGTH(transferHouse) <= 70), \
    whoPayComun VARCHAR(70) CHECK (LENGTH(whoPayComun) <= 70), \
    depositPayment VARCHAR(70) CHECK (LENGTH(depositPayment) <= 70), \
    dateAgreeBreakUp VARCHAR(70) CHECK (LENGTH(dateAgreeBreakUp) <= 70), \
    numberVisits VARCHAR(70) CHECK (LENGTH(numberVisits) <= 70), \
    personsReside VARCHAR(70) CHECK (LENGTH(personsReside) <= 70), \
    vacateHouse VARCHAR(70) CHECK (LENGTH(vacateHouse) <= 70), \
    agreementDate VARCHAR(10) CHECK (LENGTH(agreementDate) <= 10) NOT NULL, \
    city VARCHAR(70) CHECK (LENGTH(city) <= 70) NOT NULL, \
    street VARCHAR(70) CHECK (LENGTH(street) <= 70) NOT NULL, \
    houseNumber VARCHAR(10) CHECK (LENGTH(houseNumber) <= 10) NOT NULL, \
    area DECIMAL(10, 2) CHECK (REGEXP_LIKE(area, '^[0-9]+(\.[0-9]+)?$') AND area BETWEEN -1000000 AND 1000000) NOT NULL, \
    apartment VARCHAR(10) CHECK (LENGTH(apartment) <= 10) NOT NULL, \
    rent_due_data TINYINT CHECK (REGEXP_LIKE(rent_due_data, '^[0-9]+$') AND rent_due_data BETWEEN 0 AND 31) NOT NULL, \
    penalty DECIMAL(10, 2) CHECK (REGEXP_LIKE(penalty, '^[0-9]+(\.[0-9]+)?$') AND penalty BETWEEN -1000000 AND 1000000), \
    max_penalty DECIMAL(10, 2) CHECK (REGEXP_LIKE(max_penalty, '^[0-9]+(\.[0-9]+)?$') AND max_penalty BETWEEN -1000000 AND 1000000), \
    price DECIMAL(15, 2) CHECK (REGEXP_LIKE(price, '^[0-9]+(\.[0-9]+)?$') AND price BETWEEN -1000000 AND 100000000) NOT NULL, \
    i_agree BOOLEAN CHECK (i_agree IN (TRUE, FALSE)), \
    floor MEDIUMINT CHECK (REGEXP_LIKE(floor, '^[0-9]+$') AND floor BETWEEN -1000000 AND 1000000), \
    about_agree VARCHAR(6000) CHECK (LENGTH(about_agree) <= 6000), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id), \
    FOREIGN KEY (owner_id) REFERENCES users(user_id), \
    FOREIGN KEY (subscriber_id) REFERENCES users(user_id))", (err, result)=> {
    if (result) {
        console.log(result)
    };
});





con.query("CREATE TABLE IF NOT EXISTS agreement_act ( \
    agreement_id VARCHAR(300) PRIMARY KEY CHECK (LENGTH(agreement_id) <= 200) NOT NULL, \
    electro VARCHAR(70) CHECK (LENGTH(electro) <= 70), \
    cold_water VARCHAR(70) CHECK (LENGTH(cold_water) <= 70), \
    hot_water VARCHAR(70) CHECK (LENGTH(hot_water) <= 70), \
    gas VARCHAR(70) CHECK (LENGTH(gas) <= 70), \
    about_act VARCHAR(10000) CHECK (LENGTH(about_act) <= 10000), \
    FOREIGN KEY (agreement_id) REFERENCES agreement(agreement_id))", (err, result)=> {
    if (result) {
        console.log(result)
    };
});




con.query("CREATE TABLE IF NOT EXISTS agreement_filling ( \
    agreement_id VARCHAR(300) CHECK (LENGTH(agreement_id) <= 200) NOT NULL, \
    type_filling VARCHAR(50) CHECK (LENGTH(type_filling) <= 50), \
    number_filling MEDIUMINT CHECK (REGEXP_LIKE(number_filling, '^[0-9]+$') AND number_filling BETWEEN -1000000 AND 1000000), \
    condition_filling VARCHAR(50) CHECK (LENGTH(condition_filling) <= 50), \
    img VARCHAR(120) CHECK (LENGTH(img) <= 120), \
    about_filling VARCHAR(900) CHECK (LENGTH(about_filling) <= 900), \
    name_filling VARCHAR(70) CHECK (LENGTH(name_filling) <= 70), \
    FOREIGN KEY (agreement_id) REFERENCES agreement(agreement_id))", (err, result)=> {
    if (result) {
        console.log(result)
    };
});


con.query("CREATE TABLE IF NOT EXISTS chat_name ( \
    chat_id VARCHAR(70) CHECK (LENGTH(chat_id) <= 200), \
    PRIMARY KEY (chat_id))", (err, result)=> {
    if (err) throw err;
});


con.query("CREATE TABLE IF NOT EXISTS group_chat ( \
    flat_id INT, \
    user_id INT, \
    chat_id VARCHAR(70) CHECK (LENGTH(chat_id) <= 200), \
    admin BOOLEAN CHECK (admin IN (TRUE, FALSE)), \
    FOREIGN KEY (chat_id) REFERENCES chat_name(chat_id), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id), \
    FOREIGN KEY (user_id) REFERENCES users(user_id))", (err, result)=> {
    if (err) throw err;
});


con.query("CREATE TABLE IF NOT EXISTS chat ( \
    flat_id INT, \
    user_id INT, \
    chat_id VARCHAR(70) CHECK (LENGTH(chat_id) <= 200), \
    message VARCHAR(500) CHECK (LENGTH(message) <= 500), \
    data DATETIME, \
    FOREIGN KEY (chat_id) REFERENCES chat_name(chat_id), \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id), \
    FOREIGN KEY (user_id) REFERENCES users(user_id))", (err, result)=> {
    if (err) throw err;
});


const tableName = 'message';
const deleteTableQuery = `DROP TABLE IF EXISTS ${tableName}`;

con.query(deleteTableQuery, (err, result) => {
  if (err) throw err;
  console.log(`Таблиця ${tableName} успішно видалена.`);
});



con.query("CREATE TABLE IF NOT EXISTS message ( \
    flat_id INT, \
    user_id INT, \
    sender_id INT, \
    chat_id VARCHAR(70) CHECK (LENGTH(chat_id) <= 200), \
    is_read BOOLEAN DEFAULT FALSE, \
    message VARCHAR(500) CHECK (LENGTH(message) <= 500 AND LENGTH(message) > 0) NOT NULL, \
    data DATETIME, \
    FOREIGN KEY (flat_id) REFERENCES flat(flat_id), \
    FOREIGN KEY (user_id) REFERENCES users(user_id), \
    FOREIGN KEY (sender_id) REFERENCES users(user_id), \
    FOREIGN KEY (chat_id) REFERENCES chat_name(chat_id) \
    )", (err, result)=> {
    if (err) throw err;
});






con.query('SHOW TABLES', (error, results, fields) => {
    if (error) throw error;
    console.log('Tables:', results);
});




con.end() 


})




