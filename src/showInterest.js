const showInterest  = {
    show: async function(rate) {
        const mysql = require("promise-mysql");
        const config = require("../config/internetbanken.json");
        const db = await mysql.createConnection(config);

        rate = rate.trim();

        let str;

        str = await showAccountInterest(db, rate);

        console.log(str);
        return;
    }

};

async function showAccountInterest(db, rate) {
    let sql;
    let res;
    let str;

    sql = `CALL calculateInterest(${rate}, CURRENT_TIMESTAMP());`;

    res = await db.query(sql, [rate]);
    res = res[0];
    console.log(res);
    str = interestAsTable(res);
    return str;
}

function interestAsTable(res) {
    let str;

    str  = "+----------------+---------+-------------------------------+\n";
    str += "|  Bankkonto id  |  Saldo  |  Kontoinnehavare              |\n";
    str += "+----------------+---------+-------------------------------+\n";

    for (const row of res) {
        str += "| " + row.rate.toString().padEnd(13);
        str += "  | " + row.date.toString().padEnd(5);
        str += "   | " + row.idBankkonto.toString().padEnd(30);
        str += "| \n";
    }
    str += "+----------------+---------+-------------------------------+";
    return str;
}

module.exports = showInterest;
