const db = require('../db/connection');

const getFromUuid = async (uuid) => {
  const sql = 'SELECT * FROM workflow WHERE uuid = $1';
  const { rows } = await db.query(sql, [uuid]).catch((error) => {
    const errorMsg = { error: { message: error.message, code: 'notFound' } };
    throw errorMsg;
  });
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const getAllWorkflowsModel = async () => {
  const sql = 'SELECT * FROM workflow';
  const { rows } = await db.query(sql).catch((error) => {
    const errorMsg = { error: { message: error.message, code: 'notFound' } };
    throw errorMsg;
  });
  return rows;
};

const newWorkflowModel = async ({ UUID, status, data, steps }) => {
  const sql = 'INSERT INTO workflow (uuid, status, json_data, array_data) VALUES ($1, $2, $3, $4) RETURNING *';
  const dataJson = JSON.stringify(data);
  const arrayString = steps.toString();
  const { rows } = await db
    .query(sql, [UUID, status, dataJson, arrayString])
    .catch((error) => {
      const errorMsg = {
        error: { message: error.message, code: 'alreadyExists' },
      };
      throw errorMsg;
    });
  return rows;
};

const updateStatusModel = async (uuid, status) => {
  const sql = 'UPDATE workflow SET status = $1 WHERE uuid = $2';
  await db.query(sql, [status, uuid]).catch((error) => {
    const errorMsg = { error: { message: error.message, code: 'badRequest' } };
    throw errorMsg;
  });
};

module.exports = {
  getFromUuid,
  newWorkflowModel,
  getAllWorkflowsModel,
  updateStatusModel,
};
