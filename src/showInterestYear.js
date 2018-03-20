const showInterestYear  = {
    show: async function(year) {
        const mysql = require("promise-mysql");
        const config = require("../config/internetbanken.json");
        const db = await mysql.createConnection(config);

        year = year.trim();

        let str;

        str = await showAccountInterest(db, year);

        console.log(str);
        return;
    }

};

async function showAccountInterest(db, year) {
    let sql;
    let res;
    let str;

    sql = `CALL showCalculateForYear(${year});`;

    res = await db.query(sql, [year]);
    res = res[0];
    str = interestAsTable(res);
    return str;
}

function interestAsTable(res) {
    let str;

    str  = "+--------------+-----------+--------+----------------------------";
    str += "----------------------------------+\n";
    str += "| Calculate Id | Bank Id   |  Rate  |  Date                      ";
    str += "                                   |\n";
    str += "+--------------+-----------+--------+----------------------------";
    str += "-----------------------------------+\n";

    for (const row of res) {
        str += "| " + row.calculateID.toString().padEnd(10);
        str += "   | " + row.kontoId.toString().padEnd(8);
        str += "  | " + row.rate.toString().padEnd(3);
        str += "    | " + row.tid.toString().padEnd(15);
        str += "     | \n";
    }
    str += "+--------------+-----------+--------+----------------------------";
    str += "-----------------------------------+";
    return str;
}

module.exports = showInterestYear;
