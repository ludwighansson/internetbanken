const showInterestDay  = {
    show: async function(day) {
        const mysql = require("promise-mysql");
        const config = require("../config/internetbanken.json");
        const db = await mysql.createConnection(config);

        day = day.trim();

        let str;

        str = await showAccountInterest(db, day);

        console.log(str);
        return;
    }

};

async function showAccountInterest(db, day) {
    let sql;
    let res;
    let str;

    sql = `CALL showCalculateForDay(${day});`;

    res = await db.query(sql, [day]);
    res = res[0];
    str = interestAsTable(res);
    return str;
}

function interestAsTable(res) {
    let str;

    str  = "+--------------+-----------+--------+----------------------------";
    str += "-----------------------------------+\n";
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

module.exports = showInterestDay;
