const showAccounts = {
    show: async function() {
        const mysql = require("promise-mysql");
        const config = require("../config/internetbanken.json");
        const db = await mysql.createConnection(config);

        let str;

        str = await showAccount(db);
        console.log(str);
        return;
    }

};

async function showAccount(db) {
    let sql;
    let res;
    let str;

    sql = `SELECT
		b.idBankkonto,
		b.saldo,
		CONCAT(k.fornamn, ' ', k.efternamn, ' (Kund ID: ', k.idKund, ')') AS holder
		FROM bankkonto AS b
			JOIN accountManager AS am
				ON am.accountID = b.idBankkonto
			JOIN Kund AS k
				ON k.idKund = b.Kund_idKund
			ORDER BY holder ASC;`;

    res = await db.query(sql);
    console.log(res);
    str = accountsAsTable(res);
    return str;
}

function accountsAsTable(res) {
    let str;

    str  = "+----------------+---------+-------------------------------+\n";
    str += "|  Bankkonto id  |  Saldo  |  Kontoinnehavare              |\n";
    str += "+----------------+---------+-------------------------------+\n";

    for (const row of res) {
        str += "| " + row.idBankkonto.toString().padEnd(13);
        str += "  | " + row.saldo.toString().padEnd(5);
        str += "   | " + row.holder.padEnd(30);
        str += "| \n";
}
    str += "+----------------+---------+-------------------------------+";

    return str;
}

module.exports = showAccounts;
