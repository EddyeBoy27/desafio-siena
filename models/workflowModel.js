const db = require('../db/connection');

const getFromUuid = async (uuid) => {
    await db.connect();
    const sql = 'SELECT * FROM workflow WHERE uuid = ?';
    const exists = db.query(sql, uuid, (err, rows, fields) => ({ err, rows, fields }));
    return exists;
};

module.exports = {
    getFromUuid,
};