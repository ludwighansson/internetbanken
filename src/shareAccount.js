const shareAccount =
{
    share: async function(kundId, kontoId) {
        const mysql = require("promise-mysql");
        const config = require("../config/internetbanken.json");
        const db = await mysql.createConnection(config);

        kundId = kundId.trim();
        kontoId = kontoId.trim();

        let str;

        str = await shareAccountWithUser(db, kundId, kontoId);
        return;
    }

};

async function shareAccountWithUser(db, kundId, kontoId) {
    let sql;
    let res;

    sql = ` CALL shareAccountWithUser(?, ?);`;

    res = await db.query(sql, [kontoId, kundId]);
    return res;
}

module.exports = shareAccount;
