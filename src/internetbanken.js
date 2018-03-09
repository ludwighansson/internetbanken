"use strict";

module.exports = {
    registerKund: registerKund,
    showCustomer: showCustomer
};

const mysql  = require("promise-mysql");
const config = require("../config/internetbanken.json");
let db;

(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();

async function registerKund(fornamn, efternamn, fodd, adress, ort, pinkod) {
    let sql = `CALL createUser(?,?,?,?,?,?)`;
    let res;

    res = await db.query(sql, [fornamn, efternamn, fodd, adress, ort, pinkod]);
    return res[0];
}

async function showCustomer(id) {
    let sql = `CALL getAllAccountsOnUserID(?);`;
    let res;

    res = await db.query(sql, [id]);

    return res[0];
}
