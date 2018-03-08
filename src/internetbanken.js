"use strict";

module.exports = {
    register: register
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

async function register(fornamn, efternamn, fodd, adress, ort, pinkod) {
    let sql = `CALL registerKund(?,?,?,?,?,?)`;
    let res;

    res = await db.query(sql, [fornamn, efternamn, fodd, adress, ort, pinkod]);
    return res;
}
