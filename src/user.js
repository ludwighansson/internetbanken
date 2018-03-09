"use strict";

module.exports = {
    login: login
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

/**
 * Login using pinkod and idKund.
 *
 * @async
 * @param {string} Idkund The idKund to use for login.
 * @param {string} pinkod The pinkod to use for login.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function login(idKund, pinkod) {
    let sql = `CALL loginUser(?, ?);`;
    let res;

    res = await db.query(sql, [idKund, pinkod]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}
