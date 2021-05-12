const { getFromUuid } = require('../models/workflowModel');

const newWorkflowService = async (body) => {
    const { UUID, status, data, steps } = body;
    const alreadyExists = await getFromUuid(UUID);
    console.log(alreadyExists);
};

module.exports = {
    newWorkflowService,
};