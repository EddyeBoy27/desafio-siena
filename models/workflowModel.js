const db = require('../db/connection');

const getFromUuid = async (uuid) => {
    await db.connect();
    const sql = 'SELECT * FROM workflow WHERE uuid = ?';
    const exists = db.query(sql, uuid, (err, rows, fields) => ({ err, rows, fields }));
    return exists;
};

const newWorkflowModel = async ({ UUID, status, data, steps }) => {
    const sql = 'INSERT INTO workflow (uuid, status, json_data, array_data) VALUES ($1, $2, $3, $4) RETURNING *';
    const dataJson = JSON.stringify(data);
    const arrayString = steps.toString();
    console.log(dataJson);
    console.log(arrayString);
    const newInsert = db.query(
        sql, [UUID, status, dataJson, arrayString], (err, rows, fields) => ({ err, rows, fields }),
    );
    return newInsert;
};

module.exports = {
    getFromUuid,
    newWorkflowModel,
};