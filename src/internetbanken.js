"use strict";

module.exports = {
    registerKund: registerKund,
    showCustomer: showCustomer,
    customerList: customerList,
    transferMoney: transferMoney,
    printLogg: printLogg
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
 * Register a customer to the bank.
 *
 * @async
 * @param {string} fornamn The fornamn input in register from.
 * @param {string} efternamn The efternamn input in register from.
 * @param {string} fodd The fodd input in register from..
 * @param {string} adress The adress input in register from.
 * @param {string} ort The ort input in register from.
 * @param {int} pinkod The pinkod input in register from.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function registerKund(fornamn, efternamn, fodd, adress, ort, pinkod) {
    let sql = `CALL createUser(?,?,?,?,?,?)`;
    let res;

    res = await db.query(sql, [fornamn, efternamn, fodd, adress, ort, pinkod]);
    return res[0];
}

/**
 * Show customer accounts.
 *
 * @async
 * @param {string} id customer id.
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showCustomer(id) {
    let sql = `CALL getAllAccountsOnUserID(?);`;
    let res;

    res = await db.query(sql, [id]);

    return res[0];
}

async function customerList() {
    let sql = `SELECT * FROM kund;`;
    let res;

    res = await db.query(sql);
    return res;
}

/**
 * transfer money.
 *
 * @async
 * @param {int} ownId The user id
 * @param {int} idBankkonto The receivers id
 * @param {int} amount Amount of money thats moveing
 * @returns {RowDataPacket} Resultset from the query.
 */
async function transferMoney(ownId, idBankkonto, amount) {
    let sql = `CALL transferMoney(?,?,?);`;
    let res;

    res = await db.query(sql, [ownId, idBankkonto, amount]);
    return res;
}

async function printLogg() {
    let sql = `SELECT * FROM logg
               ORDER BY tid DESC;`;
    let res;

    res = await db.query(sql);
    return res;
}
