const db = require('../db/connection');

const getFromUuid = async (uuid) => {
    await db.connect();
    console.log(uuid);
    console.log(typeof uuid);
    const sql = 'SELECT * FROM workflow;';
    db.query(sql, async (error, results) => {
        if (error) {
            const errorMsg = { error: { message: error.message, code: 'notFound' } };
            await db.end();
            throw errorMsg;
        } else {
            await db.end();
            return results;
        }
    });
};

const newWorkflowModel = async ({ UUID, status, data, steps }) => {
    const sql = 'INSERT INTO workflow (uuid, status, json_data, array_data) VALUES ($1, $2, $3, $4) RETURNING *';
    const dataJson = JSON.stringify(data);
    const arrayString = steps.toString();
    await db.connect();
    db.query(
        sql, [UUID, status, dataJson, arrayString], async (error, results) => {
            if (error) {
                await db.end();
                const errorMsg = { error: { message: error.message, code: 'alreadyExists' } };
                throw errorMsg;
            } else {
                await db.end();
                return results.rows;
            }
        },
    );
};

module.exports = {
    getFromUuid,
    newWorkflowModel,
};