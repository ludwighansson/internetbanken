const addUser =
{
    add: async function(fornamn, efternamn, fodd, adress, ort, pinkod) {
        const mysql = require("promise-mysql");
        const config = require("../config/internetbanken.json");
        const db = await mysql.createConnection(config);

        fornamn = fornamn.trim();
        efternamn = efternamn.trim();
        fodd = fodd.trim();
        adress = adress.trim();
        ort = ort.trim();
        pinkod = pinkod.trim();

        let str;

        str = await addCustomer(db, fornamn, efternamn, fodd, adress, ort, pinkod);
        console.log(str);
        return;
    }

};

async function addCustomer(db, fornamn, efternamn, fodd, adress, ort, pinkod) {
    let sql;
    let res;

    sql = ` CALL createUser(?, ?, ?, ?, ?, ?);`;

    res = await db.query(sql, [fornamn, efternamn, fodd, adress, ort, pinkod]);
    return res;
}

module.exports = addUser;
